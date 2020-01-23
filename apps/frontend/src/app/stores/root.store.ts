import { RouterStore } from 'mobx-react-router';
import { MainStore } from '@mogilev-guide/frontend/stores/main.store';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';

export class RootStore {
  public routerStore = new RouterStore();
  public uiStore = new UiStore();
  public mainStore = new MainStore(this.uiStore);
}
