import React, { memo } from 'react';
import { Interest } from '@mogilev-guide/models';
import { SingleInterest } from './singleInterest';
import styled from 'styled-components';

interface Props {
  data: Interest[];
}

const StyledGroup = styled.div`
text-align: center;
`;

export const InterestsGroup = memo(({ data }: Props) => {
  return <StyledGroup>
    {data.map(interest =>
      <SingleInterest key={interest.id} data={interest} />
    )}
  </StyledGroup>;
});
