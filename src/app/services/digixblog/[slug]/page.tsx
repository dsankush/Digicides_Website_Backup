import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, getAllPublishedBlogs } from '@/lib/blog-storage';
import { ChevronLeft, Clock, Calendar, User, Tag } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://digicides.com'}/services/digixblog/${blog.slug}`;

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.subtitle || blog.title,
    authors: blog.author ? [{ name: blog.author }] : undefined,
    keywords: blog.tags,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.subtitle || blog.title,
      url: url,
      type: 'article',
      images: blog.thumbnail ? [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ] : [],
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: blog.author ? [blog.author] : undefined,
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.subtitle || blog.title,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:published_time': blog.created_at,
      'article:modified_time': blog.updated_at,
      'article:author': blog.author || '',
      'article:section': blog.category || '',
      'article:tag': blog.tags.join(','),
    },
  };
}

// Generate static params for all published blogs
export async function generateStaticParams() {
  const blogs = await getAllPublishedBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <Link 
            href="/services/digixblog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Blogs
          </Link>
        </div>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <article>
          {/* Cover Image */}
          {blog.thumbnail && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6 flex-wrap">
            {blog.category && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {blog.category}
              </span>
            )}
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{blog.reading_time} min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={blog.created_at}>{formattedDate}</time>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
              {blog.subtitle}
            </h2>
          )}

          {/* Author */}
          {blog.author && (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <User size={16} />
                  {blog.author}
                </p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none 
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-6
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
              [&_p]:mb-4 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
              [&_li]:mb-2
              [&_blockquote]:border-l-4 [&_blockquote]:border-primary 
              [&_blockquote]:pl-4 [&_blockquote]:italic 
              [&_blockquote]:bg-[#FEF4E8] [&_blockquote]:py-3 
              [&_blockquote]:rounded-r-lg [&_blockquote]:my-4
              [&_pre]:bg-gray-900 [&_pre]:text-gray-100 
              [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
              [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 
              [&_code]:rounded [&_code]:text-sm
              [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
              [&_img]:rounded-lg [&_img]:my-6 [&_img]:w-full
              [&_video]:rounded-lg [&_video]:my-6 [&_video]:w-full
              [&_hr]:my-8 [&_hr]:border-gray-300
              [&_figure]:my-6
              [&_figcaption]:text-sm [&_figcaption]:text-center 
              [&_figcaption]:text-muted-foreground [&_figcaption]:mt-2"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={20} className="text-primary" />
                <h3 className="font-semibold text-lg">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Share Section (Optional) */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            Found this article helpful? Share it with others!
          </p>
        </div>
      </main>
    </div>
  );
}