import React, { memo, useEffect, useRef } from 'react';
import {
  GOOGLE_MAP_API_KEY,
  GOOGLE_MAP_CONTENT_ID,
  GOOGLE_MAP_SCRIPT_ID
} from '@mogilev-guide/frontend/components/googleMap/config';
import styled from 'styled-components';
import { Place } from '@mogilev-guide/models';
import { createPopupClass } from './services/popup';
import './googleMap.css';
import { createPlaceMarkers, createPopupView } from './services';
import { Popup } from './models';

interface Props {
  onInit: (map, marker, popup) => void;
  places: Place[];
  map: google.maps.Map;
  handleSelectedPlace: (id: string) => void;
  selectedPlaceId: string;
  placePopup: Popup;
  handlePopupClick: () => void;
}

const StyledContainer = styled.div`
  min-height: 300px;
  height: 100%;
`;

export const GoogleMap = memo(
  ({
    onInit,
    map,
    places,
    handleSelectedPlace,
    selectedPlaceId,
    placePopup,
    handlePopupClick
  }: Props) => {
    const googleMapRef = useRef(null);

    useEffect(() => {
      const googleMapScript = document.createElement('script');
      googleMapScript.id = GOOGLE_MAP_SCRIPT_ID;
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener('load', () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const googleMap = new google.maps.Map(googleMapRef.current, {
              zoom: 16,
              center: {
                lng: position.coords.longitude,
                lat: position.coords.latitude
              },
              disableDefaultUI: false
            });

            const myPosition = new google.maps.Marker({
              position: {
                lng: position.coords.longitude,
                lat: position.coords.latitude
              },
              map: googleMap
            });

            const contentPopup = createPopupView();
            const Popup = createPopupClass();
            const popup = new Popup(
              new google.maps.LatLng(0, 0),
              contentPopup,
              '',
              null
            );

            onInit(googleMap, myPosition, popup);
          },
          () => {
            console.error('geo location is not supported');
            onInit(undefined, undefined, undefined);
          }
        );
      });

      return () => {
        document.getElementById(GOOGLE_MAP_SCRIPT_ID).remove();
      };
    }, [onInit]);

    useEffect(() => {
      if (map) {
        createPlaceMarkers({
          map,
          places,
          handleSelectedPlace,
          selectedPlaceId,
          placePopup,
          handlePopupClick
        });
      }
    }, [
      places,
      map,
      handleSelectedPlace,
      selectedPlaceId,
      placePopup,
      handlePopupClick
    ]);

    return (
      <StyledContainer
        id={GOOGLE_MAP_CONTENT_ID}
        ref={googleMapRef}
      ></StyledContainer>
    );
  }
);
