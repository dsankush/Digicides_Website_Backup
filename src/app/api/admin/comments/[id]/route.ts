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

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface UpdateRequest {
  status: 'approved' | 'rejected';
}

// PUT update comment status (approve/reject)
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    const body = await req.json() as UpdateRequest;
    const { status } = body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    
    const supabase = getSupabase();
    
    const updates: Record<string, unknown> = {
      status,
    };
    
    if (status === 'approved') {
      updates.approved_at = new Date().toISOString();
      updates.approved_by = admin.name;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: updatedComment, error } = await supabase
      .from('blog_comments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error ?? !updatedComment) {
      console.error('Update comment error:', error);
      return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: `Comment ${status}`,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
  }
}

// DELETE comment
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    const supabase = getSupabase();
    
    const { error } = await supabase
      .from('blog_comments')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Delete comment error:', error);
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
