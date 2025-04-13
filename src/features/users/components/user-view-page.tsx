'use client';

import { notFound } from 'next/navigation';
import UserForm from './user-form';
import USERS_API from '@/features/users/api/users';
import { useEffect, useState } from 'react';

type TUserViewPageProps = {
  userId?: number;
};

export default function UserViewPage({ userId }: TUserViewPageProps) {
  let user = null;
  let pageTitle = 'Create New User';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setIsLoading(true);

        try {
          const user = await USERS_API.get(userId);
          if (!user) {
            notFound();
          }
          pageTitle = `Edit User`;
        } catch (error) {
          console.error('Error loading users:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [userId]);

  return <UserForm initialData={user} pageTitle={pageTitle} />;
}
