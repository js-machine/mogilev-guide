//import * as Moment from 'moment';
import { Language } from '../language';

export interface RouteDto {
  id: string;
  title: Language;
  //duration: Moment.Duration;
  duration: string;
  distance: number;
  rating: number;
  reviews: number;
  places: number;
  image?: string;
  sights?: string[];
}

export interface Route {
  id: string;
  title: string;
  //duration: Moment.Duration;
  duration: string;
  distance: number;
  rating: number;
  reviews: number;
  places: number;
  image?: string;
  sights?: string[];
}
