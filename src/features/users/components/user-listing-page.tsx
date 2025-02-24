'use client';

import { useEffect, useState } from 'react';
import { DataTable as UserTable } from '@/components/ui/table/data-table';
import { columns } from './user-tables/columns';
import { User, UserListParams } from '@/types/user-types';
import USERS_API from '@/features/users/api/users';

export default function UserListingPage({
  filters
}: {
  filters: UserListParams;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await USERS_API.list(filters);
        setUsers(data.data);
        setTotalUsers(data.meta.total);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <UserTable columns={columns} data={users} totalItems={totalUsers} />;
}
