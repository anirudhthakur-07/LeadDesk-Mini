import { NextResponse } from 'next/server';
import { applySecurityHeaders } from '@/utils/securityHeaders';

const COOKIE_NAME = 'leaddesk_token';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  let response = NextResponse.next();

  // Route protection for /admin dashboard
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }
  }

  // Protect sensitive admin API operations (GET /api/leads, PATCH /api/leads/[id], DELETE /api/leads/[id])
  if (pathname.startsWith('/api/leads')) {
    if (req.method === 'GET' || req.method === 'PATCH' || req.method === 'DELETE') {
      if (!token) {
        return applySecurityHeaders(
          NextResponse.json(
            { success: false, error: 'Unauthorized. Admin authentication required.' },
            { status: 401 }
          )
        );
      }
    }
  }

  // Redirect logged-in admin away from /login page to /admin
  if (pathname === '/login' && token) {
    return applySecurityHeaders(NextResponse.redirect(new URL('/admin', req.url)));
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/leads/:path*'],
};
