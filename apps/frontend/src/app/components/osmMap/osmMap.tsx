import React, { useEffect, useState, memo } from 'react';
import L, { MapOptions } from 'leaflet';
import { MapContainer, Marker, useMap, TileLayer } from 'react-leaflet';
import { useStores } from '@mogilev-guide/frontend/stores';
import styled from 'styled-components';

const MapStyle = styled.div`
  height: 100%;
  min-height: 300px;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

export const OsmMap = memo(() => {
  const { uiStore } = useStores();
  const [center, setMapCenter] = useState<L.LatLng>(L.latLng(53.894548, 30.330654));

  const ChangeView = ({ center }: MapOptions) => {
    const map = useMap();
    if (center) map.setView(center, map.getZoom());
    return null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const myPosition = L.latLng(position.coords.latitude, position.coords.longitude);
        setMapCenter(myPosition);
      },
      () => {
        console.error('geo location is not supported');
      }
    );
    uiStore.setIsLoading(false);
  }, [uiStore]);


  return (
    <MapStyle>
      <MapContainer center={center} zoom={18}>
        <ChangeView center={center} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={center}
        />
      </MapContainer>
    </MapStyle>
  );
});

