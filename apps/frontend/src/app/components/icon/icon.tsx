import React, { memo } from 'react';
import styled from 'styled-components';
import icons from './../../../assets/icons.svg';

interface Props {
  name: string;
}

const IconStyle = styled.div<{ offset: number }>`
  svg {
    background: ${props => `url(${icons}) 0 ${props.offset}px`}
    height: 24px;
    width: 24px;
  }
`;

export const Icon = memo(({ name }: Props) => {
  return (
    <IconStyle offset={getOffset(name)}>
      <svg viewBox="0 0 24 24" className={`icon icon-${name}`}></svg>
    </IconStyle>
  );
});

const ICON_OFFSET = -24;
function getOffset(name: string): number {
  let order;
  switch (name) {
    case 'menu':
      order = 2;
      break;
    case 'search':
      order = 3;
      break;
    case 'folder':
      order = 7;
      break;
    case 'heart':
      order = 8;
      break;
    case 'route':
      order = 11;
      break;
    default:
      order = 0;
  }

  return order * ICON_OFFSET;
}
