// Server-side blog data fetcher
// Use this in server components only

import { createClient } from '@supabase/supabase-js';
import type { Blog } from '@/types/blog';

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

export async function fetchBlogServer(slug: string): Promise<Blog | null> {
  try {
    const supabase = getSupabase();
    
    // Try to find by slug
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !blog) {
      return null;
    }

    return mapDbToBlog(blog as DbBlog);
  } catch (error) {
    console.error('Error fetching blog server-side:', error);
    return null;
  }
}