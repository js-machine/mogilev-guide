import { InterestModel } from '@mogilev-guide/api/models';

export interface SightModel {
  id: string;
  nameID: string;
  addressID: string;
  accessTime: {
    from: number;
    to: number;
  };
  coordinates: Coordinates;
  interest: InterestModel;
  historyID: string;
  photos: string[];
  background: string;
  reviewsID: string[];
  rating: number[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
