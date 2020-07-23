import { UiStore } from './ui.store';
import { RouterStore } from 'mobx-react-router';
import { SightsStore } from './sights.store';

export class RootStore {
  public uiStore: UiStore = new UiStore(this);
  public routerStore: RouterStore = new RouterStore();
  public sightStore: SightsStore = new SightsStore(this.uiStore);
}
