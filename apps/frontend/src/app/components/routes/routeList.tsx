import React, { memo } from 'react';
import { Route } from '@mogilev-guide/models';
import { RouteCard } from './routeCard';

interface Props {
  data: Route[];
}

export const RouteList = memo(({ data }: Props) => {
  return (
    <div>
      {data.map(route => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
});
