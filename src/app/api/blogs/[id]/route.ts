import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Blog } from '@/types/blog';

export const dynamic = 'force-dynamic';

interface DbBlog {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string | null;
  meta_title: string;
  meta_description: string;
  status: 'draft' | 'published';
  word_count: number;
  reading_time: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function mapDbToBlog(row: DbBlog): Blog {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    slug: row.slug,
    content: row.content,
    author: row.author,
    category: row.category,
    tags: row.tags || [],
    thumbnail: row.thumbnail,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    status: row.status,
    wordCount: row.word_count,
    readingTime: row.reading_time,
    likesCount: row.likes_count || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single blog by ID or slug
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    
    // Try to find by ID first
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    // If not found by ID, try by slug
    if (error ?? !blog) {
      const result = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', id)
        .single();
      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      blog = result.data;
      error = result.error;
    }
    
    if (error ?? !blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const mappedBlog = mapDbToBlog(blog as DbBlog);
    return NextResponse.json({ success: true, blog: mappedBlog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT update blog
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json() as Partial<Blog>;
    const supabase = getSupabase();
    
    // Check if blog exists
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: existingBlog, error: findError } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (findError ?? !existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    const existing = existingBlog as DbBlog;
    
    // Calculate word count and reading time if content changed
    let wordCount = existing.word_count;
    let readingTime = existing.reading_time;
    
    if (body.content !== undefined) {
      const plainText = body.content.replace(/<[^>]*>/g, '');
      wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
      readingTime = Math.max(1, Math.ceil(wordCount / 200));
    }
    
    // Build update object
    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      word_count: wordCount,
      reading_time: readingTime,
    };

    if (body.title !== undefined) updates.title = body.title;
    if (body.subtitle !== undefined) updates.subtitle = body.subtitle;
    if (body.slug !== undefined) updates.slug = body.slug;
    if (body.content !== undefined) updates.content = body.content;
    if (body.author !== undefined) updates.author = body.author;
    if (body.category !== undefined) updates.category = body.category;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.thumbnail !== undefined) updates.thumbnail = body.thumbnail;
    if (body.metaTitle !== undefined) updates.meta_title = body.metaTitle;
    if (body.metaDescription !== undefined) updates.meta_description = body.metaDescription;
    if (body.status !== undefined) updates.status = body.status;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: updatedBlog, error: updateError } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (updateError ?? !updatedBlog) {
      console.error('Update error:', updateError);
      return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }

    const mappedBlog = mapDbToBlog(updatedBlog as DbBlog);
    return NextResponse.json({ success: true, blog: mappedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE blog
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}