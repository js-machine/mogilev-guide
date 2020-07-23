import styled from 'styled-components';

export const SightRatingContainer = styled.div``;

export const SightRatingHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const SightRatingHeaderNum = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

export const SightRatingHeaderStars = styled.div`
  margin-left: 10px;
  padding-top: 3px;
`;

export const SightRatingBars = styled.div``;

export const SightRatingBarContainer = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const SightRatingBarNum = styled.div`
  flex-shrink: 0;
  margin-right: 9px;
`;

export const SightRatingBar = styled.div<{ value: number }>`
  position: relative;
  flex-grow: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 999999px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${({ value }) => value * 100}%;
    background-color: #09dddf;
    border-radius: inherit;
  }
`;
