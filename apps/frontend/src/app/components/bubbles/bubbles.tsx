import React, {
  memo,
  useRef,
  useEffect
} from 'react';
import { Interest } from '@mogilev-guide/models';
import styled from 'styled-components';
import { createD3Bubbles } from './services';

interface Props {
  data: Interest[];
}

const StyledGroup = styled.svg`
  text-align: center;
  width: 100%;
  height: 400px;
`;

export const Bubbles = memo(({ data }: Props) => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    createD3Bubbles(svgRef, data);
  }, [data]);

  return <StyledGroup ref={svgRef} />;
});
