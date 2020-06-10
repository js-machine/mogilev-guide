import { Controller, Get, Post, Put, Delete, Route, Body } from 'tsoa';
import { Language } from '@mogilev-guide/models';
import { LanguagesConverter } from '@mogilev-guide/api/helpers';
import { Inject } from '@mogilev-guide/api/ioc';
import { LanguageService } from '@mogilev-guide/api/services/language';

@Route('languages')
export class LanguagesController extends Controller {
  @Inject() private languageService!: LanguageService;

  @Get()
  public async getAllLanguageRecords(): Promise<Language[]> {
    const langRecords = await this.languageService.getAllLangRecords();
    return LanguagesConverter.fromDBToFrontArray(langRecords);
  }

  @Get('{id}')
  public async getLanguageRecordByID(id: string): Promise<Language> {
    const langRecord = await this.languageService.getLangRecordByID(id);
    const resultRec = (langRecord) ? LanguagesConverter.fromDBToFront(langRecord) : null;
    return resultRec;
  }

  @Post()
  public async addLanguageRecord(
    @Body() langRecord: Language
  ): Promise<string> {
    const newLangRec = await LanguagesConverter.fromFrontToDB(langRecord);
    return this.languageService.addLanguageRecord(newLangRec);
  }

  @Put('{id}')
  public async updateLanguageRecords(
    id: string,
    @Body() langRecord: Language
  ): Promise<Language> {
    const newLangRec = await LanguagesConverter.fromFrontToDB(langRecord);
    return this.languageService.updateLanguageRecord(id, newLangRec);
  }

  @Delete('{id}')
  public async deleteLanguageRecord(id: string): Promise<string> {
    const deleteResult: boolean = await this.languageService.deleteLanguageRecordByID(
      id
    );
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
