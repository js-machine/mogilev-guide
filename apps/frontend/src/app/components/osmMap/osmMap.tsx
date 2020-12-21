import React, { useEffect, useState, memo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, useMap, TileLayer } from 'react-leaflet';
import { useStores } from '@mogilev-guide/frontend/stores';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

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
  const [map, setMap] = useState<L.Map>();

  const MapView = () => {
    setMap(useMap());
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

  useEffect(() => {
    if (center && map) map.setView(center, map.getZoom());
  }, [center, map]);


  return (
    <MapStyle>
      <MapContainer center={center} zoom={18}>
        <MapView />
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

