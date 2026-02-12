"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Blog } from '@/types/blog';
import { fetchBlogs } from '@/lib/blog-storage';
import { 
  Clock, ArrowRight, Tag, User, Calendar, Search, 
  FileText, Loader2, Heart
} from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const publishedBlogs = await fetchBlogs('published');
        setBlogs(publishedBlogs);
        setFilteredBlogs(publishedBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
      setIsLoading(false);
    };

    void loadBlogs();
  }, []);

  // Filter blogs
  useEffect(() => {
    let result = blogs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.subtitle?.toLowerCase().includes(query) ||
        blog.author?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(result);
  }, [blogs, searchQuery, selectedCategory]);

  const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#FEF4E8] to-white pt-28 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Insights, strategies, and success stories from the world of agri-marketing and rural engagement
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-6 border-b bg-white sticky top-0 z-40">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-foreground'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText size={64} className="mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {blogs.length === 0 ? 'No blog posts yet' : 'No posts found'}
              </h2>
              <p className="text-muted-foreground">
                {blogs.length === 0
                  ? 'Check back soon for new content'
                  : 'Try adjusting your search or category filter'}
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredBlog && (
                <Link href={`/blog/${featuredBlog.slug}`}>
                  <article className="group mb-12 bg-white rounded-3xl shadow-lg hover:shadow-xl overflow-hidden transition-all">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                        {featuredBlog.thumbnail ? (
                          <Image
                            src={featuredBlog.thumbnail}
                            alt={featuredBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                        )}
                      </div>

                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          {featuredBlog.category && (
                            <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
                              {featuredBlog.category}
                            </span>
                          )}
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock size={14} />
                            {featuredBlog.readingTime} min read
                          </span>
                          {featuredBlog.likesCount > 0 && (
                            <span className="text-sm text-pink-500 flex items-center gap-1">
                              <Heart size={14} fill="currentColor" />
                              {featuredBlog.likesCount}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {featuredBlog.title}
                        </h2>

                        {featuredBlog.subtitle && (
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {featuredBlog.subtitle}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          {featuredBlog.author && (
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {featuredBlog.author}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(featuredBlog.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Remaining Posts Grid */}
              {remainingBlogs.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingBlogs.map((blog) => (
                    <Link key={blog.id} href={`/blog/${blog.slug}`}>
                      <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          {blog.thumbnail ? (
                            <Image
                              src={blog.thumbnail}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                          )}

                          {blog.category && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">
                              {blog.category}
                            </span>
                          )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {blog.readingTime} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                            {blog.likesCount > 0 && (
                              <span className="flex items-center gap-1 text-pink-500">
                                <Heart size={12} fill="currentColor" />
                                {blog.likesCount}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                          </h3>

                          {blog.subtitle && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                              {blog.subtitle}
                            </p>
                          )}

                          {blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {blog.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1"
                                >
                                  <Tag size={10} />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all mt-auto">
                            Read More
                            <ArrowRight size={16} />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#FEF4E8]">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the latest insights on agri-marketing delivered to your inbox.
          </p>
          <Link href="/#contact-us">
            <Button size="lg" className="gap-2">
              Contact Us
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}