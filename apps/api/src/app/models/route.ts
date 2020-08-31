//import * as Moment from 'moment';

export interface RouteModel {
  id: string;
  titleID: string;
  //duration: Moment.Duration;
  duration: string;
  distance: number;
  rating: number;
  reviews: number;
  places: number;
  image?: string;
  sights?: string[];
}
