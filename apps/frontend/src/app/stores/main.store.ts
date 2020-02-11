import { action, observable, runInAction } from 'mobx';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { Interest, Route } from '@mogilev-guide/models';
import { getInterests } from '@mogilev-guide/data-service';
import { getRoutes } from '../../../../../libs/data-service/src/lib/api/routes.api';

export class MainStore {
  @observable public interests: Interest[] = [];
  @observable public routes: Route[] = [];

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

  @action public getRoutes = async () => {
    this.uiStore.setIsLoading(true);

    try {
      const routes = await getRoutes();
      runInAction(() => (this.routes = routes));
    } finally {
      this.uiStore.setIsLoading(false);
    }
  };
}
