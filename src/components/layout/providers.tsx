'use client';
import React from 'react';
import { AuthProvider } from '@/lib/auth/auth-context';
import { ThemeProvider } from 'next-themes';
import QueryProvider from '@/providers/query-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
