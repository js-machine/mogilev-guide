import React, { memo } from 'react';
import { Interest } from '@mogilev-guide/models';
import { SingleInterest } from './singleInterest';

interface Props {
  data: Interest[];
}

export const InterestsGroup = memo(({ data }: Props) => {
  return <div>
    {data.map(interest =>
      <SingleInterest key={interest.id} data={interest} />
    )}
  </div>;
});
