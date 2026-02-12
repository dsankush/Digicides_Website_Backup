import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// GET check if user is authenticated
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    const supabase = getSupabase();
    
    // Find valid session
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .select('*, admins(*)')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (sessionError ?? !session) {
      // Clear invalid cookie
      cookieStore.delete('admin_token');
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    const sessionData = session as {
      admin_id: string;
      admins: { id: string; email: string; name: string };
    };
    
    return NextResponse.json({
      authenticated: true,
      admin: {
        id: sessionData.admins.id,
        email: sessionData.admins.email,
        name: sessionData.admins.name,
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
