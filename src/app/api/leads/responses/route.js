import { NextResponse } from 'next/server';
import { leadService } from '@/services/leadService';
import { sanitizeString, validateEmail } from '@/utils/sanitize';
import { rateLimit } from '@/lib/rateLimit';
import { logger } from '@/utils/logger';

// Public endpoint: Lookup admin responses by email
export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitCheck = rateLimit(`responses_${ip}`, 10, 15 * 60 * 1000);

    if (limitCheck.isRateLimited) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many lookup requests. Please try again in ${limitCheck.timeRemainingSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email = sanitizeString(body.email);

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 422 }
      );
    }

    const result = await leadService.getResponsesByEmail(email.toLowerCase());

    return NextResponse.json(
      {
        success: true,
        data: result.leads,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Unhandled error in POST /api/leads/responses', error);
    return NextResponse.json(
      { success: false, error: 'Failed to lookup responses' },
      { status: 500 }
    );
  }
}
