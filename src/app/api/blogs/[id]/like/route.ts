import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface LikeRequest {
  fingerprint: string;
}

// GET check if user has liked this blog
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id: blogId } = await params;
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get('fingerprint');
    
    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    }
    
    const supabase = getSupabase();
    
    // Check if user has already liked
    const { data: existingLike } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_fingerprint', fingerprint)
      .single();
    
    // Get total likes count
    const { data: blog } = await supabase
      .from('blogs')
      .select('likes_count')
      .eq('id', blogId)
      .single();
    
    return NextResponse.json({
      success: true,
      hasLiked: !!existingLike,
      likesCount: (blog as { likes_count: number } | null)?.likes_count ?? 0,
    });
  } catch (error) {
    console.error('Error checking like:', error);
    return NextResponse.json({ error: 'Failed to check like status' }, { status: 500 });
  }
}

// POST toggle like (like if not liked, unlike if already liked)
export async function POST(req: Request, { params }: RouteParams) {
  try {
    const { id: blogId } = await params;
    const body = await req.json() as LikeRequest;
    const { fingerprint } = body;
    
    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    }
    
    const supabase = getSupabase();
    
    // Check if blog exists
    const { data: blog, error: blogError } = await supabase
      .from('blogs')
      .select('id, likes_count')
      .eq('id', blogId)
      .single();
    
    if (blogError ?? !blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Check if user has already liked
    const { data: existingLike } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_fingerprint', fingerprint)
      .single();
    
    if (existingLike) {
      // Unlike: Remove the like
      const { error: deleteError } = await supabase
        .from('blog_likes')
        .delete()
        .eq('blog_id', blogId)
        .eq('user_fingerprint', fingerprint);
      
      if (deleteError) {
        console.error('Delete like error:', deleteError);
        return NextResponse.json({ error: 'Failed to unlike' }, { status: 500 });
      }
      
      // Get updated count
      const { data: updatedBlog } = await supabase
        .from('blogs')
        .select('likes_count')
        .eq('id', blogId)
        .single();
      
      return NextResponse.json({
        success: true,
        action: 'unliked',
        hasLiked: false,
        likesCount: (updatedBlog as { likes_count: number } | null)?.likes_count ?? 0,
      });
    } else {
      // Like: Add new like
      const { error: insertError } = await supabase
        .from('blog_likes')
        .insert([{
          blog_id: blogId,
          user_fingerprint: fingerprint,
        }]);
      
      if (insertError) {
        console.error('Insert like error:', insertError);
        return NextResponse.json({ error: 'Failed to like' }, { status: 500 });
      }
      
      // Get updated count
      const { data: updatedBlog } = await supabase
        .from('blogs')
        .select('likes_count')
        .eq('id', blogId)
        .single();
      
      return NextResponse.json({
        success: true,
        action: 'liked',
        hasLiked: true,
        likesCount: (updatedBlog as { likes_count: number } | null)?.likes_count ?? 0,
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}