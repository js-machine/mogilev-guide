export interface SightModel {
  id: string;
  nameID: string;
  addressID: string;
  accessTime: {
    from: number;
    to: number;
  };
  coordinates: Coordinates;
  interestID: string;
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
