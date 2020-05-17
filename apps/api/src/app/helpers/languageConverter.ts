import { Language } from '@mogilev-guide/models';
import { LanguageModel } from '@mogilev-guide/api/models';

export class LanguagesConverter {
  public static async fromDBToFront(langRec: LanguageModel): Promise<Language> {
    const frontLangRec: Language = {
      id: langRec.id,
      itemID: langRec.itemID,
      ru: langRec.ru,
      en: langRec.en
    };
    return frontLangRec;
  }

  public static async fromFrontToDB(langRec: Language): Promise<LanguageModel> {
    const dbLangRec: LanguageModel = {
      id: langRec.id,
      itemID: langRec.itemID,
      ru: langRec.ru,
      en: langRec.en
    };
    return dbLangRec;
  }

  public static async fromDBToFrontArray(
    langRecs: LanguageModel[]
  ): Promise<Language[]> {
    const langRecArr = langRecs.reduce((langArr, langRec) => {
      const frontLangRec = this.fromDBToFront(langRec);
      langArr.push(frontLangRec);
      return langArr;
    }, []);

    return await Promise.all(langRecArr);
  }

  public static async fromFrontToDBArray(
    langRecs: Language[]
  ): Promise<LanguageModel[]> {
    const langRecArr = langRecs.reduce((langArr, langRec) => {
      const frontLangRec = this.fromFrontToDB(langRec);
      langArr.push(frontLangRec);
      return langArr;
    }, []);

    return await Promise.all(langRecArr);
  }
}
