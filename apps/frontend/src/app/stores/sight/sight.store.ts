import { action, observable, runInAction } from 'mobx';
import { Sight } from '@mogilev-guide/models';
import { getSight } from '@mogilev-guide/data-service';
import { UiStore } from '../ui.store';
import { Tabs } from './sight.constants';

export class SightStore {
  @observable
  sight: Sight;

  @observable
  activeTab: Tabs = Tabs.HISTORY;

  constructor(private uiStore: UiStore) {}

  @action
  getSight = async (id: Sight['id']) => {
    this.uiStore.setIsLoading(true);

    try {
      const sight = await getSight(id);
      runInAction(() => (this.sight = sight));
    } finally {
      this.uiStore.setIsLoading(false);
    }
  };

  @action
  setActiveTab = (tab: Tabs) => {
    this.activeTab = tab;
  };
}
