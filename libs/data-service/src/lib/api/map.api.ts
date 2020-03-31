import { Place } from '@mogilev-guide/models';

export async function getNearestPlaces(
  amount: number,
  latitude: number,
  longitude: number
): Promise<Place[]> {
  return fetch(`/api/map/nearest/${amount}?latit=${latitude}&longit=${longitude}`, {
    method: 'GET'
  }).then(response => response.json());
}
