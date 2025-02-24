'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { columns } from './user-tables/columns';
import { useUserTableFilters } from './user-tables/use-user-table-filters';
import USERS_API from '../api/users';
import { useEffect, useState } from 'react';
import { UserListResponse } from '../types';

export default function UserListingPage() {
  const { searchQuery, typeFilter, page } = useUserTableFilters();
  const [data, setData] = useState<UserListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await USERS_API.list({
          name: searchQuery as string,
          type: typeFilter as string,
          page: String(page),
          limit: '10',
          sort: 'created_at',
          sort_type: 'desc'
        });
        setData(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, typeFilter, page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      totalItems={data?.meta?.total ?? 0}
    />
  );
}
