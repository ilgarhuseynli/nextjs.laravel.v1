import axiosClient from '@/lib/axiosClient';
import { User, UserListParams, UserListResponse } from '@/types/user-types';

const USERS_API = {
  list: async (params: UserListParams): Promise<UserListResponse> => {
    return await axiosClient.get('/users', { params });
  },

  get: async (id: number): Promise<User> => {
    return await axiosClient.get(`/users/${id}`);
  },

  create: async (userData: Partial<User>): Promise<User> => {
    return await axiosClient.post('/users', userData);
  },

  update: async (id: number, userData: Partial<User>): Promise<User> => {
    return await axiosClient.put(`/users/${id}`, userData);
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
  }
};

export default USERS_API;
