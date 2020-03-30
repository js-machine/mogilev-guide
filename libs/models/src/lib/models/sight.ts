import { User } from './user';
import { Interest } from './interest';
import { Language } from './language';

export interface Sight {
  id: string;
  name: Language;
  address: Language;
  accessTime: {
    from: number;
    to: number;
  };
  coordinates: Coordinates;
  interest: Interest;
  history: Language;
  photos: string[];
  photosTotalCount: number;
  background: string;
  reviews: SightReview[];
  reviewsTotalCount: number;
  rating: number[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SightReview {
  id: string;
  user: User;
  date: number;
  rating: number;
  message?: string;
}
