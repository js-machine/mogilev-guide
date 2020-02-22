import { RouterStore } from 'mobx-react-router';
import { MainStore } from '@mogilev-guide/frontend/stores/main.store';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { MapStore } from '@mogilev-guide/frontend/stores/map.store';

export class RootStore {
  public routerStore = new RouterStore();
  public uiStore = new UiStore();
  public mainStore = new MainStore(this.uiStore);
  public mapStore = new MapStore(this.uiStore);
}
