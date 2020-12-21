import React, { memo, useRef, useEffect } from 'react';
import { Interest } from '@mogilev-guide/models';
import styled from 'styled-components';
import { createBubbles } from './services';

interface Props {
  data: Interest[];
}

const StyledGroup = styled.svg`
  text-align: center;
  width: 30%;
  height: calc(100vh - 260px);
`;

export const Bubbles = memo(({ data }: Props) => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    createBubbles(svgRef, data);
  }, [data]);

  return <StyledGroup ref={svgRef} />;
});
