import { notFound } from 'next/navigation';
import UserForm from './user-form';
import USERS_API from '@/features/users/api/users';

type TUserViewPageProps = {
  userId?: number;
};

export default async function UserViewPage({ userId }: TUserViewPageProps) {
  let user = null;
  let pageTitle = 'Create New User';

  if (userId) {
    const user = await USERS_API.get(userId);
    if (!user) {
      notFound();
    }
    pageTitle = `Edit User`;
  }

  return <UserForm initialData={user} pageTitle={pageTitle} />;
}
