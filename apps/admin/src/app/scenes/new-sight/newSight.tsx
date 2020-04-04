import React, { memo, useCallback } from 'react';
import { CreateEditSight } from '@mogilev-guide/admin/components/createEditSight';
import { useStore } from '@mogilev-guide/admin/store';
import { History } from 'history';
import { Sight } from '@mogilev-guide/models';

interface Props {
  history: History;
}

export const NewSight = memo(({ history }: Props) => {
  const { sightStore } = useStore();

  const handleCreateClick = useCallback(
    async (sight: Sight) => {
      await sightStore.createSight(sight);
      history.push('/sights');
    },
    [sightStore, history]
  );

  return <CreateEditSight onCreate={handleCreateClick}/>;
});
