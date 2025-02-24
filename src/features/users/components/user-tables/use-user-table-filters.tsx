'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const USER_TYPE_OPTIONS = [
  { value: '1', label: 'Employee' },
  { value: '2', label: 'Customer' }
];

export function useUserTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'name',
    searchParams.name
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [typeFilter, setTypeFilter] = useQueryState(
    'type',
    searchParams.type.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setTypeFilter('');
    setPage(1);
  }, [setSearchQuery, setTypeFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!typeFilter;
  }, [searchQuery, typeFilter]);

  return {
    searchQuery: searchQuery || '',
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    typeFilter: typeFilter || '',
    setTypeFilter
  };
}
