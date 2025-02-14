import axiosClient from '@/lib/axios';
import { API_ROUTES } from '@/config/routes';
import Cookies from 'js-cookie';

type LoginCredentials = {
  email: string;
  password: string;
};

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

  async login(credentials: LoginCredentials) {
    await this.getCsrfToken();

    const { data } = await axiosClient.post(API_ROUTES.auth.login, credentials);

    // Store token in both localStorage and cookie
    localStorage.setItem('token', data.token);
    Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days

    return data;
  },

  async logout() {
    await this.getCsrfToken();
    await axiosClient.post(API_ROUTES.auth.logout);

    // Clear token from both localStorage and cookie
    localStorage.removeItem('token');
    Cookies.remove('token');
  }
};
