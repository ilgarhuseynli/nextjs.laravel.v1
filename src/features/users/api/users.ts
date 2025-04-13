import axiosClient from '@/lib/axiosClient';
import { User, UserListParams, UserListResponse } from '@/types/user-types';
import { API_ROUTES } from '@/config/routes';

const USERS_API = {
  list: async (params: UserListParams): Promise<UserListResponse> => {
    return await axiosClient.get(API_ROUTES.users.list, { params });
  },

  get: async (id: number): Promise<User> => {
    return await axiosClient.get(API_ROUTES.users.get(id));
  },

  create: async (userData: Partial<User>): Promise<User> => {
    return await axiosClient.post(API_ROUTES.users.create, userData);
  },

  update: async (id: number, userData: Partial<User>): Promise<User> => {
    return await axiosClient.put(API_ROUTES.users.update(id), userData);
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(API_ROUTES.users.delete(id));
  }
};

export default USERS_API;
