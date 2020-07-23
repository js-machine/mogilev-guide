import { action, observable, runInAction } from 'mobx';
import { Sight, SightMapper, SightReview } from '@mogilev-guide/models';
import { getSight, getReviews } from '@mogilev-guide/data-service';
import { UiStore } from '../ui.store';
import { Tabs } from './sight.constants';

export class SightStore {
  @observable
  sight: Sight;

  @observable
  reviews: SightReview[] = [];

  @observable
  activeTab: Tabs = Tabs.HISTORY;

  @observable
  isReviewsLoading: boolean;

  constructor(private uiStore: UiStore) {}

  @action
  getSight = async (id: Sight['id']) => {
    this.uiStore.setIsLoading(true);

    try {
      const sight = await getSight(id);
      runInAction(
        () =>
          (this.sight = SightMapper.mapToUi(sight, this.uiStore.activeLanguage))
      );
    } finally {
      this.uiStore.setIsLoading(false);
    }
  };

  @action
  getReviews = async (sightId: string) => {
    this.isReviewsLoading = true;

    try {
      const reviews = await getReviews(sightId);
      runInAction(() => (this.reviews = reviews));
    } finally {
      this.isReviewsLoading = false;
    }
  };

  @action
  setActiveTab = (tab: Tabs) => {
    this.activeTab = tab;
  };
}
