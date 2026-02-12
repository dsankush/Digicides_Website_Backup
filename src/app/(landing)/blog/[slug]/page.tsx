import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { fetchBlogServer } from '@/lib/blog-server';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const blog = await fetchBlogServer(slug);
    
    if (!blog || blog.status !== 'published') {
      return {
        title: 'Blog Not Found | Digicides',
        description: 'The requested blog post could not be found.',
      };
    }

    const blogUrl = `https://www.digicides.com/blog/${blog.slug}`;
    const imageUrl = blog.thumbnail || 'https://www.digicides.com/Logo.png';

    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.subtitle || blog.title,
      keywords: blog.tags.join(', '),
      authors: blog.author ? [{ name: blog.author }] : undefined,
      alternates: {
        canonical: blogUrl,
      },
      openGraph: {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.subtitle || blog.title,
        type: 'article',
        url: blogUrl,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: blog.author ? [blog.author] : undefined,
        tags: blog.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.subtitle || blog.title,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog | Digicides',
      description: 'Read our latest insights on agriculture marketing.',
    };
  }
}

// Main page component (server component)
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const blog = await fetchBlogServer(slug);
    
    if (!blog || blog.status !== 'published') {
      notFound();
    }

    // Pass the blog data to the client component
    return <BlogPostClient initialBlog={blog} />;
  } catch (error) {
    console.error('Error loading blog:', error);
    notFound();
  }
}