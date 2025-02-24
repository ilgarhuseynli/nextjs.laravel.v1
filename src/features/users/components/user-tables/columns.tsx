import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/user-types';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'image',
    header: 'Avatar',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.first_name?.[0]}</AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{user.name}</span>
          <span className='text-xs text-muted-foreground'>{user.email}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    )
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => {
      const address = row.original.address;
      return (
        <div className='flex flex-col'>
          <span>{address?.street}</span>
          {address?.city && (
            <span className='text-xs text-muted-foreground'>
              {address.city}, {address.country}
            </span>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      return format(new Date(row.original.created_at * 1000), 'MMM dd, yyyy');
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
