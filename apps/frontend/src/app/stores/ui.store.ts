import { action, observable } from 'mobx';

export class UiStore {
  @observable public isPageLoading?: boolean;

  public constructor() {
  }

  @action public setIsLoading = (isPageLoading: boolean) => {
    this.isPageLoading = isPageLoading;
  };
}
