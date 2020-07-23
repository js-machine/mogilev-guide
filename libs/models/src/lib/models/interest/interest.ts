import { Language } from '../language';

export interface InterestDto {
  id: string;
  label: Language;
  description: Language;
  size: string;
}

export interface Interest {
  id: string;
  label: string;
  description: string;
  size: string;
}
