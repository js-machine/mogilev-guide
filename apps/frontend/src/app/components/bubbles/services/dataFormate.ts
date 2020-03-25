import { Interest } from "@mogilev-guide/models";
import { D3InterestData, D3_INTERESTS_DATA } from '../models';

export function getD3FormattedInterestsData(
  width: number,
  interestsData: Interest[]
): D3InterestData[] {
  const getRadius = (width: number, percentage: number) =>
    ((width * percentage) / 100) * D3_INTERESTS_DATA.BUBBLE_RADIUS_DELTA;
  return interestsData.map(item => {
    return {
      id: item.id,
      label: item.label,
      radius:
        item.size === 'large'
          ? getRadius(width, D3_INTERESTS_DATA.LARGE_BUBBLE_SIZE)
          : item.size === 'medium'
          ? getRadius(width, D3_INTERESTS_DATA.MEDIUM_BUBBLE_SIZE)
          : getRadius(width, D3_INTERESTS_DATA.SMALL_BUBBLE_SIZE)
    };
  });
}