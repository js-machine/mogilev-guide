import { action, observable, runInAction } from 'mobx';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { Interest } from '@mogilev-guide/models';
import { getInterests } from '@mogilev-guide/data-service';

export class MainStore {
  @observable public interests: Interest[] = [];


  public constructor(private uiStore: UiStore) {
  }

  @action public getInterests = async (withCache: boolean) => {
    let isLoading = false;

    if (withCache && !this.interests.length) {
      this.uiStore.setIsLoading(true);
      isLoading = true;
    }

    try {
      const interests = await getInterests();
      runInAction(() => (this.interests = interests));
    } finally {
      if (isLoading) {
        this.uiStore.setIsLoading(false);
      }
    }
  };

}
