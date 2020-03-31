import { Place } from '@mogilev-guide/models';

export interface Popup extends google.maps.OverlayView {
  position: google.maps.LatLng;
  content: Element;
  text: string;
  handlePopupClick: () => void;
}

export interface CreatePlaceMarkerProps {
  map: google.maps.Map;
  placePopup: Popup;
  places: Place[],
  selectedPlaceId: string;
  handleSelectedPlace: (id: string) => void;
  handlePopupClick: () => void;
}
