import { User } from '../user';
import { Interest, InterestDto } from '../interest';
import { Language } from '../language';

export interface SightDto {
  id: string;
  name: Language;
  address: Language;
  accessTime: {
    from: number;
    to: number;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  interest: InterestDto;
  history: Language;
  photos: string[];
  photosTotalCount: number;
  background: string;
  reviews: string[];
  reviewsTotalCount: number;
  rating: number[];
}

export interface Sight {
  id: string;
  name: string;
  address: string;
  accessTime: {
    from: number;
    to: number;
  };
  coordinates: Coordinates;
  interest: Interest;
  history: string;
  photos: string[];
  photosTotalCount: number;
  background: string;
  reviews: string[];
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
