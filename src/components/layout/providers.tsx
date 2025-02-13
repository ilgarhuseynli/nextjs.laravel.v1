'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { AuthProvider } from '@/lib/auth/auth-context';

export default function Providers({
  session,
  children
}: {
  session?: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {/*<SessionProvider session={session}>*/}
            {children}
          {/*</SessionProvider>*/}
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
