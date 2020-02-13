import React, { memo } from 'react';
import styled from 'styled-components';
import { Icon } from './../icon/icon';

interface Props {
  title: string
}

const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  padding: 10px 0px;
  padding-top: 17px;

  .header-title {
    text-align: center;
    font-family: Roboto;
    font-weight: 600;
    padding-top: 2px;
  }
`;

export const Header = memo(({ title }: Props) => {
  return (
    <HeaderStyle>
      <Icon name={'header-menu'}/>
      <div className={'header-title'}>{title}</div>
      <Icon name={'header-search'}/>
    </HeaderStyle>
  );
});
