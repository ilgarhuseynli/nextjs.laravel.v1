'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { useSearchParams } from 'next/navigation';
import { columns } from './user-tables/columns';
import { useUserList } from '../hooks/use-user-list';

export default function UserListingPage() {
  const searchParams = useSearchParams();
  const { data, isLoading } = useUserList({
    name: searchParams.get('name') || '',
    type: searchParams.get('type') || '',
    role_id: searchParams.get('role_id') || '',
    limit: searchParams.get('limit') || '10',
    sort: searchParams.get('sort') || 'created_at',
    sort_type: searchParams.get('sort_type') || 'desc'
  });

  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      totalItems={data?.meta?.total ?? 0}
    />
  );
}
