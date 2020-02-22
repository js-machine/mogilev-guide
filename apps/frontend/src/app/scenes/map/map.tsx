import React, { useCallback, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStores } from '@mogilev-guide/frontend/stores';
import { GoogleMap } from '@mogilev-guide/frontend/components/googleMap';
import { Loader, ButtonPanel } from '@mogilev-guide/frontend/components';
import styled, { css } from 'styled-components';

const MapComponent = styled.div`
height: calc(100vh - 16px)
`;

const MapContent = styled.div`
height: 100%;

${props => props.hidden && css`
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

  useEffect(() => {
    mapStore.initStarted();
  }, [mapStore]);

  const onMapInit = useCallback((map, myPosition) => {
    mapStore.initCompleted(map, myPosition);
  }, [mapStore]);

  return <MapComponent>
    {uiStore.isPageLoading && <Loader isLoading={uiStore.isPageLoading} />}
    <MapContent hidden={uiStore.isPageLoading}>
      <MapPanel><GoogleMap onInit={onMapInit} /></MapPanel>
      <ButtonPanelContainer>
        <ButtonPanel />
      </ButtonPanelContainer>
    </MapContent>
  </MapComponent>;
});
