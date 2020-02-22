import React, { memo, useEffect, useRef } from 'react';
import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_CONTENT_ID, GOOGLE_MAP_SCRIPT_ID } from '@mogilev-guide/frontend/components/googleMap/config';
import styled from 'styled-components';

interface Props {
  onInit: (map, marker) => void;
}

const StyledContainer = styled.div`
min-height: 300px;
height: 100%;
`;


export const GoogleMap = memo(({ onInit }: Props) => {
  const googleMapRef = useRef(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.id = GOOGLE_MAP_SCRIPT_ID;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      navigator.geolocation.getCurrentPosition(position => {
        const googleMap = new google.maps.Map(googleMapRef.current, {
          zoom: 16,
          center: {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          },
          disableDefaultUI: false
        });

        const myPosition = new google.maps.Marker({
          position: { lng: position.coords.longitude, lat: position.coords.latitude },
          map: googleMap
        });

        onInit(googleMap, myPosition);
      }, () => {
        console.error('geo location is not supported');
        onInit(undefined, undefined);
      });
    });

    return () => {
      document.getElementById(GOOGLE_MAP_SCRIPT_ID).remove();
    };
  });

  return <StyledContainer id={GOOGLE_MAP_CONTENT_ID} ref={googleMapRef}>
  </StyledContainer>;
});

