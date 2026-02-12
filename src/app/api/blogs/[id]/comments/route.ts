import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
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
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function mapDbToComment(row: DbComment): BlogComment {
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
  };
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface CommentRequest {
  userName: string;
  userEmail?: string;
  content: string;
}

// GET comments for a blog
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id: blogId } = await params;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'approved', 'pending', 'rejected', or 'all'
    const isAdmin = searchParams.get('admin') === 'true';
    
    const supabase = getSupabase();
    
    let query = supabase
      .from('blog_comments')
      .select('*')
      .eq('blog_id', blogId)
      .order('created_at', { ascending: false });
    
    // If not admin, only show approved comments
    if (!isAdmin) {
      query = query.eq('status', 'approved');
    } else if (status && status !== 'all') {
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

// POST add new comment (status = pending)
export async function POST(req: Request, { params }: RouteParams) {
  try {
    const { id: blogId } = await params;
    const body = await req.json() as CommentRequest;
    const { userName, userEmail, content } = body;
    
    if (!userName || !content) {
      return NextResponse.json({ error: 'Name and comment are required' }, { status: 400 });
    }
    
    if (content.length < 3) {
      return NextResponse.json({ error: 'Comment must be at least 3 characters' }, { status: 400 });
    }
    
    if (content.length > 1000) {
      return NextResponse.json({ error: 'Comment must be less than 1000 characters' }, { status: 400 });
    }
    
    const supabase = getSupabase();
    
    // Check if blog exists
    const { data: blog, error: blogError } = await supabase
      .from('blogs')
      .select('id')
      .eq('id', blogId)
      .eq('status', 'published')
      .single();
    
    if (blogError ?? !blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Insert comment with pending status
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: newComment, error: insertError } = await supabase
      .from('blog_comments')
      .insert([{
        blog_id: blogId,
        user_name: userName.trim(),
        user_email: userEmail?.trim() || null,
        content: content.trim(),
        status: 'pending',
      }])
      .select()
      .single();
    
    if (insertError) {
      console.error('Insert comment error:', insertError);
      return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
    }
    
    const mappedComment = mapDbToComment(newComment as DbComment);
    return NextResponse.json({
      success: true,
      comment: mappedComment,
      message: 'Your comment has been submitted and is awaiting approval.',
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}