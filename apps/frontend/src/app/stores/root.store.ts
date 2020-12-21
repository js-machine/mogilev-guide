import { RouterStore } from 'mobx-react-router';
import { MainStore } from '@mogilev-guide/frontend/stores/main.store';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { SightStore } from './sight/sight.store';

export class RootStore {
  public routerStore = new RouterStore();
  public uiStore = new UiStore();
  public mainStore = new MainStore(this.uiStore);
  public sightStore = new SightStore(this.uiStore);
}
