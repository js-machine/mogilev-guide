import { action, observable, runInAction } from 'mobx';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { Interest, Route, InterestMapper } from '@mogilev-guide/models';
import { getInterests, getRoutes } from '@mogilev-guide/data-service';

export class MainStore {
  @observable public interests: Interest[] = [];
  @observable public routes: Route[] = [];

  public constructor(private uiStore: UiStore) {}

  @action public getInterests = async () => {
    this.uiStore.setIsLoading(true);

    try {
      const interests = await getInterests();
      runInAction(
        () =>
          (this.interests = interests.map(interest =>
            InterestMapper.mapToUi(interest, this.uiStore.activeLanguage)
          ))
      );
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
