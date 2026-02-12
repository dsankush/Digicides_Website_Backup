import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Blog } from '@/types/blog';

export const dynamic = 'force-dynamic';

// Database row type
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

// GET all blogs
export async function GET(req: Request) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'published', 'draft', or null for all
    
    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data: blogs, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }

    const mappedBlogs = (blogs as DbBlog[] || []).map(mapDbToBlog);
    return NextResponse.json({ success: true, blogs: mappedBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST create new blog
export async function POST(req: Request) {
  try {
    const body = await req.json() as Partial<Blog>;
    const supabase = getSupabase();
    
    const title = body.title ?? '';
    const slug = body.slug ?? title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check for duplicate slug
    const { data: existingBlog } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingBlog) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }
    
    const content = body.content ?? '';
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: newBlog, error } = await supabase
      .from('blogs')
      .insert([{
        title,
        subtitle: body.subtitle ?? '',
        slug,
        content,
        author: body.author ?? '',
        category: body.category ?? '',
        tags: body.tags ?? [],
        thumbnail: body.thumbnail ?? null,
        meta_title: body.metaTitle ?? title,
        meta_description: body.metaDescription ?? '',
        status: body.status ?? 'draft',
        word_count: wordCount,
        reading_time: readingTime,
        likes_count: 0,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }

    const mappedBlog = mapDbToBlog(newBlog as DbBlog);
    return NextResponse.json({ success: true, blog: mappedBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}