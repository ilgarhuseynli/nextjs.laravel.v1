import axiosClient from '@/lib/axiosClient';
import { API_ROUTES } from '@/config/routes';
import Cookies from 'js-cookie';
import {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
  AuthSettings
} from '@/types/auth-types';

export const authService = {
  async getCsrfToken() {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_ROUTES.auth.csrf}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    );
  },

  async getAuthSettings(): Promise<AuthSettings> {
    return await axiosClient.get('/authsettings');
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.getCsrfToken();

    const response: AuthResponse = await axiosClient.post(
      API_ROUTES.auth.login,
      credentials
    );

    // Store token in both localStorage and cookie
    localStorage.setItem('token', response.token);
    Cookies.set('token', response.token, { expires: 7 }); // Expires in 7 days

    return response;
  },

  async logout() {
    await this.getCsrfToken();
    await axiosClient.post(API_ROUTES.auth.logout);

    // Clear token from both localStorage and cookie
    localStorage.removeItem('token');
    Cookies.remove('token');
  },

  clearToken() {
    // Clear token from both localStorage and cookie
    localStorage.removeItem('token');
    Cookies.remove('token');
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    await this.getCsrfToken();

    const response: AuthResponse = await axiosClient.post(
      API_ROUTES.auth.register,
      credentials
    );

    // Store token in both localStorage and cookie
    localStorage.setItem('token', response.token);
    Cookies.set('token', response.token, { expires: 7 }); // Expires in 7 days

    return response;
  }
};
