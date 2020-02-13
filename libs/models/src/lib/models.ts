import * as Moment from 'moment';

export interface Interest {
  id: string;
  label: string;
  description: string;
  size: string;
}

export interface User {
  id: string;
  login: string;
  email: string;
  firstName?: string;
  lastName?: string;
  rights?: string;
}

export interface Route {
  id: string;
  title: string;
  duration: Moment.Duration;
  distance: number;
  rating: number;
  reviews: number;
  places: number;
  image?: string;
}
