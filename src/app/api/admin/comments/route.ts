import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { BlogComment } from '@/types/blog';

export const dynamic = 'force-dynamic';

interface DbComment {
  id: string;
  blog_id: string;
  user_name: string;
  user_email: string | null;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approved_at: string | null;
  approved_by: string | null;
  blogs?: {
    title: string;
    slug: string;
  };
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function mapDbToComment(row: DbComment): BlogComment & { blogTitle?: string; blogSlug?: string } {
  return {
    id: row.id,
    blogId: row.blog_id,
    userName: row.user_name,
    userEmail: row.user_email ?? undefined,
    content: row.content,
    status: row.status,
    createdAt: row.created_at,
    approvedAt: row.approved_at ?? undefined,
    approvedBy: row.approved_by ?? undefined,
    blogTitle: row.blogs?.title,
    blogSlug: row.blogs?.slug,
  };
}

async function verifyAdmin(): Promise<{ id: string; name: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  
  if (!token) return null;
  
  const supabase = getSupabase();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: session } = await supabase
    .from('admin_sessions')
    .select('*, admins(*)')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single();
  
  if (!session) return null;
  
  const sessionData = session as {
    admins: { id: string; name: string };
  };
  
  return { id: sessionData.admins.id, name: sessionData.admins.name };
}

// GET all comments (for admin)
export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'pending', 'approved', 'rejected', or 'all'
    
    const supabase = getSupabase();
    
    let query = supabase
      .from('blog_comments')
      .select('*, blogs(title, slug)')
      .order('created_at', { ascending: false });
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data: comments, error } = await query;
    
    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
    
    const mappedComments = (comments as DbComment[] || []).map(mapDbToComment);
    return NextResponse.json({ success: true, comments: mappedComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
