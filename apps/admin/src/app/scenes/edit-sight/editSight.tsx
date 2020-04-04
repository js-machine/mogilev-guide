import React, { memo, useCallback, useEffect, useState } from 'react';
import { CreateEditSight } from '@mogilev-guide/admin/components/createEditSight';
import { useStore } from '@mogilev-guide/admin/store';
import { History } from 'history';
import { Sight } from '@mogilev-guide/models';
import { match } from 'react-router';

interface Props {
  history: History;
  match: match<{ sightId: string }>;
}

export const EditSight = memo(function EditDigest({
                                                    history,
                                                    match: {
                                                      params: { sightId }
                                                    }
                                                  }: Props) {
  const { sightStore } = useStore();
  const [editSight, setEditSight] = useState<Sight>();

  useEffect(() => {
    sightStore.getSightById(sightId).then(sight => {
      setEditSight(sight);
    });
  }, [sightStore, sightId]);

  const handleCreateClick = useCallback(
    async (sight: Sight) => {
      await sightStore.saveSight(sight);
      history.push('/sights');
    },
    [sightStore, history]
  );

  return (
    <CreateEditSight
      sight={editSight}
      onCreate={handleCreateClick}
      submitText="save"
    />
  );
});
