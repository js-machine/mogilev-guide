import React, { memo } from 'react';
import { Interest } from '@mogilev-guide/models';

interface Props {
  data: Interest[]
}

export const Interests = memo(({ data }: Props) => {
  return <div>
    {data.length}
  </div>;
});
