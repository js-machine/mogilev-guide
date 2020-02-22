import React, { memo } from 'react';
import { Icon } from './../icon';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

export const ButtonPanel = memo(() => {
  return (
    <Container>
      <Icon name={'heart'} />
      <Icon name={'folder'} />
      <Icon name={'route'} />
    </Container>
  );
});
