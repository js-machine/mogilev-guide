import { action, observable } from 'mobx';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';

export class MapStore {
  @observable public map: google.maps.Map;
  @observable public myPosition: google.maps.Marker;

  public constructor(private uiStore: UiStore) {}

  @action public initStarted = () => {
    this.uiStore.setIsLoading(true);
  };

  @action public initCompleted = (
    map: google.maps.Map,
    myPosition: google.maps.Marker
  ) => {
    this.uiStore.setIsLoading(false);

    this.map = map;
    this.myPosition = myPosition;
  };
}
