import { RouteDto, Language } from '@mogilev-guide/models';
import { RouteModel } from '@mogilev-guide/api/models';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { LanguagesConverter } from './languageConverter';
import { Inject, Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class RoutesConverter {
  @Inject() private languageService: LanguageService;

  public async fromDBToFront(dbRoute: RouteModel): Promise<RouteDto> {
    const title = await this.languageService.getLangRecordByID(dbRoute.titleID);
    return {
      id: dbRoute.id,
      title: title,
      //duration: dbRoute.duration,
      duration: null,
      distance: dbRoute.distance,
      rating: dbRoute.rating,
      reviews: dbRoute.reviews,
      places: dbRoute.places,
      image: dbRoute.image,
      sights: dbRoute.sights
    };
  }

  public async fromFrontToDB(frontRoute: RouteDto): Promise<RouteModel> {
    const titleID = await this.insertLangRecord(frontRoute.title);
    return {
      id: frontRoute.id,
      titleID: titleID,
      //duration: frontRoute.duration,
      duration: null,
      distance: frontRoute.distance,
      rating: frontRoute.rating,
      reviews: frontRoute.reviews,
      places: frontRoute.places,
      image: frontRoute.image,
      sights: frontRoute.sights
    };
  }

  public async fromDBToFrontArray(routes: RouteModel[]): Promise<RouteDto[]> {
    const langRecArr = routes.map(langRec => this.fromDBToFront(langRec));
    return Promise.all(langRecArr);
  }

  public async fromFrontToDBArray(routes: RouteDto[]): Promise<RouteModel[]> {
    const langRecArr = routes.map(langRec => this.fromFrontToDB(langRec));
    return Promise.all(langRecArr);
  }

  private async insertLangRecord(frontLangRecord: Language): Promise<string> {
    const [recLangDB, langRec] = await Promise.all([
      LanguagesConverter.fromFrontToDB(frontLangRecord),
      this.languageService.getLangRecordByID(frontLangRecord.id)
    ]);
    let langRecID: string;
    if (langRec) {
      langRecID = langRec.id;
      await this.languageService.updateLanguageRecord(
        langRec.id,
        frontLangRecord
      );
    } else {
      langRecID = await this.languageService.addLanguageRecord(recLangDB);
    }
    return langRecID;
  }
}
