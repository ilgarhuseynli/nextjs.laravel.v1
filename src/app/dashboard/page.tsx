'use client';

import { useAuth } from '@/features/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { APP_ROUTES } from '@/config/routes';

export default function Dashboard() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push(APP_ROUTES.auth.login);
    } else {
      router.push(APP_ROUTES.dashboard.overview);
    }
  }, [token, router]);

  return null; // or loading spinner
}
