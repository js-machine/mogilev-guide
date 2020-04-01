import { Coordinates } from './sight';

export interface PlaceName {
  ru: string;
  eng: string;
}

export interface Place {
  id: string;
  name: PlaceName;
  coordinates: Coordinates;
}