import { RouteDto } from '@mogilev-guide/models';
import { RouteModel } from '@mogilev-guide/api/models';
import { LanguageService } from '@mogilev-guide/api/services/language';
import { LanguageHelper } from './languageHelper';
import { Inject, Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class RoutesConverter {
  @Inject() private languageService: LanguageService;
  @Inject() private languageHelper: LanguageHelper;

  public async fromDBToFront(dbRoute: RouteModel): Promise<RouteDto> {
    const title = await this.languageService.getLangRecordByID(dbRoute.titleID);
    return {
      id: dbRoute.id,
      title: title,
      duration: dbRoute.duration,
      distance: dbRoute.distance,
      rating: dbRoute.rating,
      reviews: dbRoute.reviews,
      places: dbRoute.places,
      image: dbRoute.image,
      sights: dbRoute.sights
    };
  }

  public async fromFrontToDB(frontRoute: RouteDto): Promise<RouteModel> {
    const titleID = await this.languageHelper.insertLangRecord(frontRoute.title);
    return {
      id: frontRoute.id,
      titleID: titleID,
      duration: frontRoute.duration,
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
}
