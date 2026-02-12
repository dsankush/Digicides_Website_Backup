// Blog Categories - Single declaration
export const BLOG_CATEGORIES = [
  'Marketing',
  'Best Practices',
  'Technology',
  'Agriculture',
  'Case Studies',
  'News',
  'Other'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
export type BlogStatus = 'draft' | 'published';
export type CommentStatus = 'pending' | 'approved' | 'rejected';

// Blog interface
export interface Blog {
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
  status: BlogStatus;
  word_count: number;
  reading_time: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

// Comment interface
export interface BlogComment {
  id: string;
  blog_id: string;
  user_name: string;
  user_email: string | null;
  content: string;
  status: CommentStatus;
  created_at: string;
  approved_at: string | null;
  approved_by: string | null;
}

// Form data interface
export interface BlogFormData {
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  author?: string;
  category?: string;
  tags: string[];
  thumbnail?: string | null;
  metaTitle?: string;
  metaDescription?: string;
  status: BlogStatus;
}