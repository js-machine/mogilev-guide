import React, { useEffect } from 'react';
import { GuideImg } from './components';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { useStores } from '@mogilev-guide/frontend/stores';
import { observer } from 'mobx-react-lite';
import { Loader, InterestsGroup } from '@mogilev-guide/frontend/components';

const Greeting = styled(Typography)`
text-align: center;
`;

export const Main: React.FC = observer(() => {
  const { mainStore, uiStore } = useStores();

  useEffect(() => {
    if (!mainStore.interests.length) {
      mainStore.getInterests();
    }
  }, [mainStore]);

  return <div>
    {uiStore.isPageLoading ? (
      <Loader isLoading={uiStore.isPageLoading} />
    ) : (
      <>
        <GuideImg />
        <Greeting variant="h6" color="inherit">
          Choose the most interesting places
          you would like to visit:
        </Greeting>
        <InterestsGroup data={mainStore.interests} />
      </>
    )}
  </div>;
});
