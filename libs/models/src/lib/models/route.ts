import * as Moment from 'moment';
import { Sight } from './sight';

export interface Route {
  id: string;
  title: string;
  duration: Moment.Duration;
  distance: number;
  rating: number;
  reviews: number;
  places: number;
  image?: string;
  sigthts?: Sight[];
}
