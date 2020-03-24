import React, { useEffect } from 'react';
import { GuideImg } from './components';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { useStores } from '@mogilev-guide/frontend/stores';
import { observer } from 'mobx-react-lite';
import { Loader, InterestsGroupBubbles } from '@mogilev-guide/frontend/components';
import { NavLink } from 'react-router-dom';

const Greeting = styled(Typography)`
text-align: center;
`;

const NextButton = styled(NavLink)`
float: right;
font-size: 18px;
line-height: 24px;
color: #09DDDF;
text-decoration: none;
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
        <InterestsGroupBubbles data={mainStore.interests} />

        <NextButton exact to="/map">
          Next
        </NextButton>
      </>
    )}
  </div>;
});
