import { supabase, supabaseAdmin } from './supabase';
import type { Blog, BlogFormData } from '@/types/blog';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function calculateReadingStats(content: string) {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, readingTime };
}

export async function createBlog(data: BlogFormData): Promise<Blog | null> {
  try {
    const { wordCount, readingTime } = calculateReadingStats(data.content);
    
    const blogData = {
      title: data.title,
      subtitle: data.subtitle || '',
      slug: data.slug,
      content: data.content,
      author: data.author || '',
      category: data.category || '',
      tags: data.tags || [],
      thumbnail: data.thumbnail || null,
      meta_title: data.metaTitle || data.title,
      meta_description: data.metaDescription || '',
      status: data.status,
      word_count: wordCount,
      reading_time: readingTime,
    };

    const { data: result, error } = await supabaseAdmin
      .from('blogs')
      .insert([blogData])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog:', error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error in createBlog:', error);
    return null;
  }
}

export async function updateBlog(id: string, data: Partial<BlogFormData>): Promise<Blog | null> {
  try {
    const updateData: Record<string, unknown> = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    // Recalculate stats if content changed
    if (data.content) {
      const { wordCount, readingTime } = calculateReadingStats(data.content);
      updateData.word_count = wordCount;
      updateData.reading_time = readingTime;
    }

    // Map camelCase to snake_case for database
    if (data.metaTitle) updateData.meta_title = data.metaTitle;
    if (data.metaDescription) updateData.meta_description = data.metaDescription;

    const { data: result, error } = await supabaseAdmin
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error in updateBlog:', error);
    return null;
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteBlog:', error);
    return false;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogBySlug:', error);
    return null;
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogById:', error);
    return null;
  }
}

export async function getAllPublishedBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPublishedBlogs:', error);
    return [];
  }
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all blogs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    return [];
  }
}

// Blog interactions
export async function toggleLike(blogId: string, fingerprint: string): Promise<boolean> {
  try {
    // Check if already liked
    const { data: existing } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_fingerprint', fingerprint)
      .single();

    if (existing) {
      // Unlike
      const { error } = await supabase
        .from('blog_likes')
        .delete()
        .eq('blog_id', blogId)
        .eq('user_fingerprint', fingerprint);

      return !error;
    } else {
      // Like
      const { error } = await supabase
        .from('blog_likes')
        .insert({ blog_id: blogId, user_fingerprint: fingerprint });

      return !error;
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return false;
  }
}

export async function checkLikeStatus(blogId: string, fingerprint: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_fingerprint', fingerprint)
      .single();

    return !!data;
  } catch {
    return false;
  }
}

// Helper function for fingerprinting
export function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
  }
  const dataUrl = canvas.toDataURL();
  const hash = Array.from(dataUrl).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  return `fp_${Math.abs(hash)}`;
}

export async function fetchBlog(slug: string) {
  return getBlogBySlug(slug);
}

export async function fetchBlogs() {
  return getAllPublishedBlogs();
}

export async function fetchComments(blogId: string) {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('blog_id', blogId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchComments:', error);
    return [];
  }
}

export async function submitComment(blogId: string, userName: string, userEmail: string, content: string) {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        blog_id: blogId,
        user_name: userName,
        user_email: userEmail,
        content: content,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting comment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in submitComment:', error);
    return null;
  }
}