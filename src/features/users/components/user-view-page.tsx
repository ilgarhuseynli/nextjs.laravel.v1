'use client';

import { notFound } from 'next/navigation';
import UserCreateForm from './user-create-form';
import USERS_API from '@/features/users/api/users';
import { useEffect, useState } from 'react';
import { User } from '@/types/user-types';
import FormCardSkeleton from '@/components/form-card-skeleton';
import UserEditForm from '@/features/users/components/user-edit-form';

type TUserViewPageProps = {
  userId?: number;
};

export default function UserViewPage({ userId }: TUserViewPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [pageTitle, setPageTitle] = useState('Create New User');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setIsLoading(true);

        try {
          const userData = await USERS_API.get(userId);
          if (!userData) {
            notFound();
          }
          setUser(userData);
          setPageTitle(
            `Edit User: ${userData.first_name} ${userData.last_name}`
          );
        } catch (error) {
          console.error('Error loading user:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // No userId means we're in create mode
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <FormCardSkeleton />;
  }

  if (userId) {
    return <UserEditForm initialData={user} pageTitle={pageTitle} />;
  } else {
    return <UserCreateForm initialData={user} pageTitle={pageTitle} />;
  }
}
