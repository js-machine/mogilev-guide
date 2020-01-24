import React, { memo, useCallback, useState } from 'react';
import { Interest } from '@mogilev-guide/models';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

interface Props {
  data: Interest;
}

const CircleButton = styled(({ size, isClicked, ...other }) => <Button {...other} />)`
&.MuiButton-root {
border-radius: 50%;
border: 1px solid #09DDDF;
background-color: ${props => props.isClicked ? '#09DDDF' : '#FFFFFF'};
height: ${props => props.size === 'large' ? '140px' : props.size === 'medium' ? '129px' : '97px'}
width: ${props => props.size === 'large' ? '140px' : props.size === 'medium' ? '129px' : '97px'}

font-size: 10px;
line-height: 12px;
color:  ${props => props.isClicked ? '#FFFFFF' : '#09DDDF'};

&:hover {
  background-color: ${props => props.isClicked ? '#09DDDF' : '#FFFFFF'};
}
}
`;

export const SingleInterest = memo(({ data }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const onInterestClick = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked]);

  return <CircleButton onClick={onInterestClick}
                       isClicked={isClicked}
                       size={data.size}>{data.label}</CircleButton>;
});
