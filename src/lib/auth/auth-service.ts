import axiosClient from '@/lib/axios';
import { API_ROUTES } from '@/config/routes';

type LoginCredentials = {
  email: string;
  password: string;
};

export const authService = {
  async getCsrfToken() {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${API_ROUTES.auth.csrf}`, {
      method: 'GET',
      credentials: 'include'
    });
  },

  async login(credentials: LoginCredentials) {
    await this.getCsrfToken();
    
    const { data } = await axiosClient.post(API_ROUTES.auth.login, credentials);
    return data;
  },

  async logout() {
    await this.getCsrfToken();
    await axiosClient.post(API_ROUTES.auth.logout);
    localStorage.removeItem('token');
  }
};
