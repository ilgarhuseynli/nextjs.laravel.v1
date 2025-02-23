import axiosClient from '@/lib/axiosClient';
import { User, UserListParams, UserListResponse } from '../types';

const USERS_API = {
  list: async (params: UserListParams): Promise<UserListResponse> => {
    const { data } = await axiosClient.get('/users', { params });
    return data;
  },

  get: async (id: number): Promise<User> => {
    const { data } = await axiosClient.get(`/users/${id}`);
    return data;
  },

  create: async (userData: Partial<User>): Promise<User> => {
    const { data } = await axiosClient.post('/users', userData);
    return data;
  },

  update: async (id: number, userData: Partial<User>): Promise<User> => {
    const { data } = await axiosClient.put(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
  }
};

export default USERS_API;
