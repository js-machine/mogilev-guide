import * as Moment from 'moment';
import { Sight } from './sight';
import { Language } from './language';

export interface Route {
  id: string;
  title: Language;
  duration: Moment.Duration;
  distance: number;
  rating: number;
  reviews: number;
  places: number;
  image?: string;
  sigthts?: Sight[];
}
