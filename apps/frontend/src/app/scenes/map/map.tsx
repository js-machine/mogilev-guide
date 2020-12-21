import React from 'react';

import { observer } from 'mobx-react-lite';
import { useStores } from '@mogilev-guide/frontend/stores';
import { OsmMap } from '@mogilev-guide/frontend/components/osmMap';
import { Loader, ButtonPanel } from '@mogilev-guide/frontend/components';
import styled, { css } from 'styled-components';

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
  const { uiStore } = useStores();

  return (
    <MapComponent>
      {uiStore.isPageLoading && <Loader isLoading={uiStore.isPageLoading} />}
      <MapContent hidden={uiStore.isPageLoading}>
        <MapPanel>
          <OsmMap />
        </MapPanel>
        <ButtonPanelContainer>
          <ButtonPanel />
        </ButtonPanelContainer>
      </MapContent>
    </MapComponent>
  );
});
