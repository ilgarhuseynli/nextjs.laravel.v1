'use client';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
// import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';

export default function UserTableAction() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const onChange = useCallback(
    (params: Record<string, string | number | null>) => {
      startTransition(() => {
        router.push(
          `${pathname}${
            createQueryString(params) ? `?${createQueryString(params)}` : ''
          }`
        );
      });
    },
    [pathname, router, createQueryString]
  );

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search by name...'
          defaultValue={searchParams?.get('name')?.toString()}
          onChange={(event) => {
            onChange({
              name: event.target.value
            });
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <Select
          defaultValue={searchParams?.get('type')?.toString()}
          onValueChange={(value) => {
            onChange({
              type: value || null
            });
          }}
        >
          <SelectTrigger className='h-8 w-[150px]'>
            <SelectValue placeholder='Select type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1'>Employee</SelectItem>
            <SelectItem value='2'>Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* <DataTableViewOptions
        table={{
          getState: () => ({
            pagination: {
              pageSize: Number(searchParams?.get('limit') || 10)
            }
          }),
          setPageSize: (size) => {
            onChange({
              limit: size
            });
          }
        }}
      /> */}
    </div>
  );
}
