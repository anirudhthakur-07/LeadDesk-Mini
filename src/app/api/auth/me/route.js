import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true, admin }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve session info' },
      { status: 500 }
    );
  }
}
