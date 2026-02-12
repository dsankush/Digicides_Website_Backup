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

// Simple password comparison (in production, use bcrypt)
function verifyPassword(input: string, hash: string): boolean {
  // For simplicity, we'll use a simple comparison
  // The default password is: Digicides@123
  // In production, use proper bcrypt hashing
  const defaultPasswordHash = '$2b$10$rQZ5Y8H7X6K9J0L1M2N3O.P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E';
  
  // Simple check for demo - in production use bcrypt.compare
  if (hash === defaultPasswordHash) {
    return input === 'Digicides@123';
  }
  
  // For custom passwords stored as plain text (not recommended)
  return input === hash;
}

// Generate a random token
function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

interface LoginRequest {
  email: string;
  password: string;
}

// POST login
export async function POST(req: Request) {
  try {
    const body = await req.json() as LoginRequest;
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    const supabase = getSupabase();
    
    // Find admin by email
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: admin, error: findError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    
    if (findError ?? !admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Verify password
    const adminData = admin as { id: string; email: string; name: string; password_hash: string };
    if (!verifyPassword(password, adminData.password_hash)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Create session
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    
    const { error: sessionError } = await supabase
      .from('admin_sessions')
      .insert([{
        admin_id: adminData.id,
        token,
        expires_at: expiresAt.toISOString(),
      }]);
    
    if (sessionError) {
      console.error('Session creation error:', sessionError);
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
    
    // Update last login
    await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminData.id);
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
    
    return NextResponse.json({
      success: true,
      admin: {
        id: adminData.id,
        email: adminData.email,
        name: adminData.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
