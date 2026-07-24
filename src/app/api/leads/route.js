import { NextResponse } from 'next/server';
import { validateCreateLeadPayload } from '@/validators/leadValidator';
import { leadService } from '@/services/leadService';
import { getSessionAdmin } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';
import { RATE_LIMIT_CONFIG } from '@/constants';
import { sanitizeString } from '@/utils/sanitize';
import { logger } from '@/utils/logger';

// Public endpoint: Submit a new lead
export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitCheck = rateLimit(
      `lead_${ip}`,
      RATE_LIMIT_CONFIG.LEAD_SUBMISSION.limit,
      RATE_LIMIT_CONFIG.LEAD_SUBMISSION.windowMs
    );

    if (limitCheck.isRateLimited) {
      logger.warn('Rate limit exceeded on lead submission', { ip });
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions from your IP. Please try again in ${limitCheck.timeRemainingSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = validateCreateLeadPayload(body);

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const newLead = await leadService.submitLead(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully! Our team will get back to you shortly.',
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error('Unhandled error in POST /api/leads', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process lead submission. Please try again.' },
      { status: 500 }
    );
  }
}

// Protected endpoint: Get leads list and summary metrics
export async function GET(req) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = sanitizeString(searchParams.get('search') || '');
    const status = sanitizeString(searchParams.get('status') || 'All');

    const result = await leadService.getLeadsAndMetrics(search, status);

    return NextResponse.json(
      {
        success: true,
        data: result.leads,
        metrics: result.metrics,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Unhandled error in GET /api/leads', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads data' },
      { status: 500 }
    );
  }
}
