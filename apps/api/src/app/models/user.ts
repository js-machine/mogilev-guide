export interface UserModel {
  id: string;
  login: string;
  email: string;
  firstName?: string;
  lastName?: string;
  rights?: string;
  avatar?: string;
}
