import { observable, action } from 'mobx';
import { RootStore } from './root.store';
import { LanguageList } from '@mogilev-guide/models';

export class UiStore {
  @observable public drawerOpen = false;
  @observable public isPageLoading?: boolean = true;
  @observable public activeLanguage: LanguageList = LanguageList.ru;

  public constructor(private rootStore: RootStore) {}

  @action public toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  };

  @action public setIsLoading = (isPageLoading: boolean) => {
    this.isPageLoading = isPageLoading;
  };
}
