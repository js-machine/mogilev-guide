import { action, observable } from 'mobx';
import { LanguageList } from '@mogilev-guide/models';

export class UiStore {
  @observable public isPageLoading?: boolean = true;
  @observable public activeLanguage: LanguageList = LanguageList.ru;

  @action public setIsLoading = (isPageLoading: boolean) => {
    this.isPageLoading = isPageLoading;
  };
}
