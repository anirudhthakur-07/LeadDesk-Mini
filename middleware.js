import { NextResponse } from 'next/server';
import { applySecurityHeaders } from '@/utils/securityHeaders';

const COOKIE_NAME = 'leaddesk_token';

/**
 * Safely inspects JWT payload expiration in Edge Runtime without external native dependencies.
 */
function isTokenExpiredOrInvalid(token) {
  if (!token || typeof token !== 'string') return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    // Decode base64url payload
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    if (!payload || !payload.exp) return false;

    // Check if current timestamp has exceeded exp
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds;
  } catch (err) {
    return true; // Treat parsing error as invalid token
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const isInvalid = isTokenExpiredOrInvalid(token);

  // Route protection for /admin dashboard
  if (pathname.startsWith('/admin')) {
    if (isInvalid) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(COOKIE_NAME);
      return applySecurityHeaders(res);
    }
  }

  // Protect sensitive admin API operations (GET /api/leads, PATCH /api/leads/[id], DELETE /api/leads/[id])
  if (pathname.startsWith('/api/leads')) {
    if (req.method === 'GET' || req.method === 'PATCH' || req.method === 'DELETE') {
      if (isInvalid) {
        const res = NextResponse.json(
          { success: false, error: 'Unauthorized. Admin authentication required or token expired.' },
          { status: 401 }
        );
        res.cookies.delete(COOKIE_NAME);
        return applySecurityHeaders(res);
      }
    }
  }

  // Redirect logged-in admin away from /login page to /admin if token is VALID
  if (pathname === '/login' && !isInvalid) {
    return applySecurityHeaders(NextResponse.redirect(new URL('/admin', req.url)));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/leads/:path*'],
};
