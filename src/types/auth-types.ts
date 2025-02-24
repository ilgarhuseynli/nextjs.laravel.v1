import { User } from './user-types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type AuthSettings = {
  account: User;
  permissions: string[];
};
