import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@mogilev-guide/frontend/stores';
import { GoogleMap } from '@mogilev-guide/frontend/components/googleMap';
import { Loader, ButtonPanel } from '@mogilev-guide/frontend/components';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';

const MapComponent = styled.div`
  height: calc(100vh - 16px);
`;

const MapContent = styled.div`
  height: 100%;

  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const MapPanel = styled.div`
  height: calc(100% - 85px);
`;

const ButtonPanelContainer = styled.div`
  height: 85px;
`;

export const Map: React.FC = observer(() => {
  const { mapStore, uiStore } = useStores();
  const history = useHistory();

  useEffect(() => {
    mapStore.initStarted();
  }, [mapStore]);

  useEffect(() => {
    if (mapStore.myPosition) {
      mapStore.getNearestPlaces(10);
    }
  }, [mapStore, mapStore.myPosition]);

  // useEffect(() => {
  //   const arrowBtnElement = document.querySelector('#to-sight-button');
  //   if (mapStore.selectedPlaceId && arrowBtnElement) {
  //     arrowBtnElement.addEventListener('click', onPopupClick);
  //   }
  // }, [mapStore.selectedPlaceId, onPopupClick]);

  const onMapInit = useCallback(
    (map, myPosition, popup) => {
      mapStore.initCompleted(map, myPosition, popup);
    },
    [mapStore]
  );

  const onSelectPlace = useCallback((id: string) => {
    mapStore.setSelectedPlaceId(id);
  }, [mapStore]);

  const onPopupClick = useCallback(() => {
    history.push(`/sight/${mapStore.selectedPlaceId}`);
  }, [history, mapStore.selectedPlaceId]);

  return (
    <MapComponent>
      {uiStore.isPageLoading && <Loader isLoading={uiStore.isPageLoading} />}
      <MapContent hidden={uiStore.isPageLoading}>
        <MapPanel>
          <GoogleMap
            onInit={onMapInit}
            map={mapStore.map}
            places={mapStore.nearestPlaces}
            handleSelectedPlace={onSelectPlace}
            selectedPlaceId={mapStore.selectedPlaceId}
            placePopup={mapStore.placePopup}
            handlePopupClick={onPopupClick}
          />
        </MapPanel>
        <ButtonPanelContainer>
          <ButtonPanel />
        </ButtonPanelContainer>
      </MapContent>
    </MapComponent>
  );
});
