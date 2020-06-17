import { UserModel } from './user';

export interface ReviewModel {
  id: string;
  user: UserModel;
  date: number;
  rating: number;
  message?: string;
}
