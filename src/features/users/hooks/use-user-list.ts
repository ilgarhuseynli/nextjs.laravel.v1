import { useQuery } from '@tanstack/react-query';
import { UserListParams, UserListResponse } from '../types';
import USERS_API from '../api/users';

export function useUserList(params: UserListParams) {
  return useQuery<UserListResponse>({
    queryKey: ['users', params],
    queryFn: () => USERS_API.list(params)
  });
}
