import { action, observable, runInAction } from 'mobx';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { Interest } from '@mogilev-guide/models';
import { getInterests } from '@mogilev-guide/data-service';

export class MainStore {
  @observable public interests: Interest[] = [];

  public constructor(private uiStore: UiStore) {}

  @action public getInterests = async () => {
    this.uiStore.setIsLoading(true);

    try {
      const interests = await getInterests();
      runInAction(() => (this.interests = interests));
    } finally {
      this.uiStore.setIsLoading(false);
    }
  };
}
