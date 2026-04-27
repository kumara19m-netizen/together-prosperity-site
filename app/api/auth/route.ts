import { NextResponse } from 'next/server';

const ADMIN_PASSWORD  = process.env.NEXT_PUBLIC_ADMIN_PASSWORD  || 'tp2026admin';
const MEMBER_PASSWORD = process.env.NEXT_PUBLIC_MEMBER_PASSWORD || 'tp2026member';

export async function POST(request: Request) {
  try {
    const { password, role } = await request.json();

    if (role === 'admin' && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, role: 'admin' });
    }

    if (role === 'member' && password === MEMBER_PASSWORD) {
      return NextResponse.json({ success: true, role: 'member' });
    }

    return NextResponse.json({ success: false }, { status: 401 });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}