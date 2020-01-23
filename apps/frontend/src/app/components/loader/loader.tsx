import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import styled from 'styled-components';

const BoxLoader = styled(Box)`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);

    & >div > div:nth-child(3) {
      animationDelay: 0s
    }
    & >div > div:nth-child(4) {
      animationDelay: -0.25s
    },
    & >div > div:nth-child(5): {
      animationDelay: -0.5s
    },
    & >div > div:nth-child(6): {
      animationDelay: -0.75s
    }
`;

interface Props {
  isLoading: boolean;
}

export const Loader = memo(({ isLoading }: Props) => {
  return (
    <BoxLoader>
      <ClimbingBoxLoader
        size={45}
        loading={isLoading}
      />
    </BoxLoader>
  );
});
