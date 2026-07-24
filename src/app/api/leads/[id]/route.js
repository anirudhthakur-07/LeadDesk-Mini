import { NextResponse } from 'next/server';
import { validateUpdateLeadStatusPayload } from '@/validators/leadValidator';
import { leadService } from '@/services/leadService';
import { getSessionAdmin } from '@/lib/auth';
import { isValidObjectId } from '@/utils/sanitize';
import { logger } from '@/utils/logger';

// Protected endpoint: Update lead status live
export async function PATCH(req, { params }) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const validation = validateUpdateLeadStatusPayload(id, body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const result = await leadService.updateLeadStatus(validation.id, validation.status);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Lead status updated to ${validation.status}`,
        data: result.lead,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Unhandled error in PATCH /api/leads/[id]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lead status' },
      { status: 500 }
    );
  }
}

// Protected endpoint: Delete lead record
export async function DELETE(req, { params }) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid lead ID format' },
        { status: 400 }
      );
    }

    const result = await leadService.deleteLead(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Lead deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Unhandled error in DELETE /api/leads/[id]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete lead record' },
      { status: 500 }
    );
  }
}
