import React from 'react';
import { GuideImg } from './components';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Greeting = styled(Typography)`
text-align: center;
`;

export const Main: React.FC = () => {
  return <div>
    <GuideImg />
    <Greeting variant="h6" color="inherit">
      Welcome to the Mogilev Guide!
    </Greeting>
  </div>;
};
