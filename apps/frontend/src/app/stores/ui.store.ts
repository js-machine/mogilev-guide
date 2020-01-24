import { action, observable } from 'mobx';

export class UiStore {
  @observable public isPageLoading?: boolean;

  @action public setIsLoading = (isPageLoading: boolean) => {
    this.isPageLoading = isPageLoading;
  };
}
