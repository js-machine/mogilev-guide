import React, { memo } from 'react';
import { Icon } from './../icon';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

export const Footer = memo(() => {
  return (
    <Container>
      <Icon name={'heart'}/>
      <Icon name={'folder'}/>
      <Icon name={'route'}/>
    </Container>
  );
});
