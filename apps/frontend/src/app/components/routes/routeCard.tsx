import React, { memo } from 'react';
import { Route } from '@mogilev-guide/models';
import styled from 'styled-components';

interface Props {
  route: Route;
}

const CardStyle = styled.div`
  display: grid;
  height: 240px;
  max-width: 300px;
  grid-template-rows: 150px 50px 50px;
  border-radius: 20px;
  border: 1px solid #B1B1B1;
  margin-bottom: 10px;
  font-family: Roboto;
  margin-left: 10px;
  margin-right: 10px;

  .image {
      overflow-y: hidden;
    img {
      width: 100%;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    padding: 15px 10px;
    font-size: 18px;
  }

  .info {
    font-family: Roboto;
    font-size: 16px;
    display: grid;
    grid-template-columns: 70px 40px 1fr;
    color: #B1B1B1;
    padding: 0px 10px;

    .rating {
     text-align: right;
    }
  }
`

export const RouteCard = memo(({ route }: Props) => {
  return (
    <CardStyle>
      <div className={'image'}>
        <img src={route.image}/>
      </div>
      <div className={'title'}>
        <div>{route.title}</div>
        <div>{route.duration.asHours()} h</div>
      </div>
      <div className={'info'}>
        <div className={'places'}>{route.places} places</div>
        <div className={'distance'}>{Math.round(route.distance / 1000).toFixed(1)}km</div>
        <div className={'rating'}>{route.rating} rating</div>
      </div>
    </CardStyle>
  );
});
