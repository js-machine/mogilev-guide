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
  password?: string;
  firstName?: string;
  lastName?: string;
}