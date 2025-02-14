// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_ROUTES } from '@/config/routes';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname === APP_ROUTES.auth.login;

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(APP_ROUTES.auth.login, request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL(APP_ROUTES.dashboard.overview, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
};
