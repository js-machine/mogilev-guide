import { Popup } from '../models/popup';
import { createMarkerIcon } from './createPlaceMarker';
import { MARKER_SIZE } from '../models';
import { Place } from '@mogilev-guide/models';

interface CreatePlaceMarkerProps {
  map: google.maps.Map;
  placePopup: Popup;
  places: Place[];
  selectedPlaceId: string;
  handleSelectedPlace: (id: string) => void;
  handlePopupClick: () => void;
}

export function createPlaceMarkers(props: CreatePlaceMarkerProps): void {
  const {
    map,
    placePopup,
    places,
    selectedPlaceId,
    handleSelectedPlace,
    handlePopupClick
  } = props;
  places.forEach(place => {
    const marker = new google.maps.Marker({
      position: {
        lat: place.coordinates.latitude,
        lng: place.coordinates.longitude
      },
      icon: createMarkerIcon(MARKER_SIZE, selectedPlaceId === place.id),
      map: map
    });
    marker.addListener('click', function() {
      if (selectedPlaceId !== place.id) {
        placePopup.position = new google.maps.LatLng(
          place.coordinates.latitude,
          place.coordinates.longitude
        );
        placePopup.text = place.name.ru;
        placePopup.handlePopupClick = handlePopupClick;
        placePopup.setMap(map);
        handleSelectedPlace(place.id);
      }
    });
  });
}
