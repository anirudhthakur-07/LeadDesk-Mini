import { NextResponse } from 'next/server';
import { validateLoginPayload } from '@/validators/authValidator';
import { authService } from '@/services/authService';
import { rateLimit } from '@/lib/rateLimit';
import { RATE_LIMIT_CONFIG } from '@/constants';
import { logger } from '@/utils/logger';

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitCheck = rateLimit(
      `login_${ip}`,
      RATE_LIMIT_CONFIG.ADMIN_LOGIN.limit,
      RATE_LIMIT_CONFIG.ADMIN_LOGIN.windowMs
    );

    if (limitCheck.isRateLimited) {
      logger.warn('Rate limit exceeded on admin login', { ip });
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please try again in ${limitCheck.timeRemainingSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = validateLoginPayload(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const result = await authService.authenticateAdmin(
      validation.data.email,
      validation.data.password
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Authentication successful',
        admin: result.admin,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Unhandled error in POST /api/auth/login', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
