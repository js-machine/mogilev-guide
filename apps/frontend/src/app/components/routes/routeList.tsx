import React, { memo } from 'react';
import { Route } from '@mogilev-guide/models';
import { RouteCard } from './routeCard';
import styled from 'styled-components';

interface Props {
  data: Route[];
}

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const RouteList = memo(({ data }: Props) => {
  return (
    <Container>
      {data.map(route => (
        <RouteCard key={route.id} route={route} />
      ))}
    </Container>
  );
});
