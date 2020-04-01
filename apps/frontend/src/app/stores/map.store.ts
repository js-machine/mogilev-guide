import { action, observable, runInAction } from 'mobx';
import { UiStore } from '@mogilev-guide/frontend/stores/ui.store';
import { getNearestPlaces } from '@mogilev-guide/data-service';
import { Place } from '@mogilev-guide/models';
import { Popup } from '../components/googleMap/models/popup';

export class MapStore {
  @observable public map: google.maps.Map;
  @observable public myPosition: google.maps.Marker;
  @observable public placePopup: Popup;
  @observable public nearestPlaces: Place[] = [];
  @observable public selectedPlaceId: string;

  public constructor(private uiStore: UiStore) {}

  @action public initStarted = () => {
    this.uiStore.setIsLoading(true);
  };

  @action public initCompleted = (
    map: google.maps.Map,
    myPosition: google.maps.Marker,
    placePopup: Popup
  ) => {
    this.uiStore.setIsLoading(false);

    this.map = map;
    this.myPosition = myPosition;
    this.placePopup = placePopup;
  };

  @action public getNearestPlaces = async (
    amount: number
  ) => {
    this.uiStore.setIsLoading(true);
    const markerPosition = this.myPosition.getPosition();
    const lat = markerPosition.lat();
    const lng = markerPosition.lng();

    try {
      const nearestPlaces = await getNearestPlaces(amount, lat, lng);
      runInAction(() => this.nearestPlaces = nearestPlaces);
    } finally {
      this.uiStore.setIsLoading(false);
    }
  };

  @action public setSelectedPlaceId = (id: string) => {
    runInAction(() => this.selectedPlaceId = id);
  };
}
