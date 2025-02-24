import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import UserTableAction from '@/features/users/components/user-tables/user-table-action';
import { UserListParams } from '@/features/users/types';
import UserListingPage from '@/features/users/components/user-listing-page';

export const metadata = {
  title: 'Dashboard: Users'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  const page = searchParamsCache.get('page');
  const name = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('limit');
  const type = searchParamsCache.get('type');

  const filters: UserListParams = {
    page,
    limit: pageLimit,
    ...(name && { name }),
    ...(type && { type: type })
  };

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Users'
            description='Manage users (Server side table functionalities.)'
          />
          <Link
            href='/dashboard/users/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <UserTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <UserListingPage filters={filters} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
