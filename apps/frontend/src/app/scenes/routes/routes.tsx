import React, { useEffect } from 'react';
import { useStores } from '@mogilev-guide/frontend/stores';
import { observer } from 'mobx-react-lite';
import {
  ButtonPanel,
  Header,
  Loader,
  RouteList
} from '@mogilev-guide/frontend/components';
import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

const RootStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    overflow: hidden;
  }
`;

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 50px 1fr 50px;

  .route-list {
    overflow-y: scroll;
  }
`;

export const Routes: React.FC = observer(() => {
  const { mainStore, uiStore } = useStores();
  useEffect(() => {
    const routesCount = mainStore.routes.length;
    if (!routesCount) {
      mainStore.getRoutes();
    }
  }, [mainStore]);

  return (
    <Container>
      {uiStore.isPageLoading ? (
        <Loader isLoading={uiStore.isPageLoading} />
      ) : (
        <>
          <RootStyle />
          <Header title={`Routes (${mainStore.routes.length})`} />
          <div className={'route-list'}>
            <RouteList data={mainStore.routes} />
          </div>
          <ButtonPanel />
        </>
      )}
    </Container>
  );
});
