"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Blog, BlogComment } from '@/types/blog';
import { 
  fetchBlogs, checkLikeStatus, toggleLike, 
  fetchComments, submitComment, generateFingerprint 
} from '@/lib/blog-storage';
import { 
  Clock, Calendar, Tag, ArrowLeft, Share2, ChevronRight, 
  Loader2, Heart, MessageSquare, Send, CheckCircle
} from 'lucide-react';

interface BlogPostClientProps {
  initialBlog: Blog;
}

export default function BlogPostClient({ initialBlog }: BlogPostClientProps) {
  const [blog] = useState<Blog>(initialBlog);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Like state - using any to bypass TypeScript cache issue
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>((initialBlog as any).likesCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  
  // Comment state
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentMessage, setCommentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Generate fingerprint on mount
  useEffect(() => {
    const fp = generateFingerprint();
    setFingerprint(fp);
  }, []);

  // Load related blogs and comments
  useEffect(() => {
    const loadAdditionalData = async () => {
      setIsLoading(true);
      
      try {
        // Load related blogs
        const allBlogs = await fetchBlogs('published');
        const related = allBlogs
          .filter(b => 
            b.id !== blog.id && 
            (b.category === blog.category || 
             b.tags.some(tag => blog.tags.includes(tag)))
          )
          .slice(0, 3);
        setRelatedBlogs(related);
        
        // Load comments
        const blogComments = await fetchComments(blog.id);
        setComments(blogComments);
      } catch (error) {
        console.error('Error loading additional data:', error);
      }
      
      setIsLoading(false);
    };

    void loadAdditionalData();
  }, [blog.id, blog.category, blog.tags]);

  // Check like status
  useEffect(() => {
    if (blog && fingerprint) {
      void checkLikeStatus(blog.id, fingerprint).then(({ hasLiked, likesCount }) => {
        setHasLiked(hasLiked);
        setLikesCount(likesCount);
      });
    }
  }, [blog, fingerprint]);

  // Handle like
  const handleLike = async () => {
    if (!blog || !fingerprint || isLiking) return;
    
    setIsLiking(true);
    const result = await toggleLike(blog.id, fingerprint);
    setHasLiked(result.hasLiked);
    setLikesCount(result.likesCount);
    setIsLiking(false);
  };

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || isSubmitting) return;
    
    if (!commentName.trim() || !commentContent.trim()) {
      setCommentMessage({ type: 'error', text: 'Name and comment are required' });
      return;
    }
    
    setIsSubmitting(true);
    setCommentMessage(null);
    
    const result = await submitComment(
      blog.id, 
      commentName.trim(), 
      commentContent.trim(),
      commentEmail.trim() || undefined
    );
    
    if (result.success) {
      setCommentMessage({ type: 'success', text: result.message });
      setCommentName('');
      setCommentEmail('');
      setCommentContent('');
    } else {
      setCommentMessage({ type: 'error', text: result.message });
    }
    
    setIsSubmitting(false);
  };

  // Share
  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.subtitle || blog.title,
          url: window.location.href,
        });
      } catch {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-4xl px-4 pt-28">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-foreground truncate max-w-[200px]">{blog.title}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="container mx-auto max-w-4xl px-4 pb-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4 flex-wrap">
          {blog.category && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              {blog.category}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {blog.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(blog.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          {blog.title}
        </h1>

        {blog.subtitle && (
          <p className="text-xl text-muted-foreground mb-6">
            {blog.subtitle}
          </p>
        )}

        {blog.author && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>By</span>
            <span className="font-medium text-foreground">{blog.author}</span>
          </div>
        )}
      </header>

      {/* Featured Image */}
      {blog.thumbnail && (
        <div className="container mx-auto max-w-4xl px-4 mb-12">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-12">
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Tags */}
      {blog.tags.length > 0 && (
        <div className="container mx-auto max-w-4xl px-4 pb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={18} className="text-muted-foreground" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-foreground rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="container mx-auto max-w-4xl px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => void handleLike()}
              disabled={isLiking}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                hasLiked
                  ? 'bg-red-50 text-red-500 hover:bg-red-100'
                  : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
              }`}
            >
              <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
              <span>{likesCount}</span>
              <span className="hidden sm:inline">{hasLiked ? 'Liked' : 'Like'}</span>
            </button>
            
            <span className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare size={20} />
              {comments.length} comments
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>

            <Button variant="outline" className="gap-2" onClick={() => void handleShare()}>
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <MessageSquare size={24} />
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Leave a Comment</h3>
          
          {commentMessage && (
            <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
              commentMessage.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {commentMessage.type === 'success' ? <CheckCircle size={18} /> : <MessageSquare size={18} />}
              {commentMessage.text}
            </div>
          )}
          
          <form onSubmit={(e) => void handleCommentSubmit(e)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Comment *
              </label>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write your comment here..."
                required
                rows={4}
                maxLength={1000}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {commentContent.length}/1000 characters
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Your comment will be visible after approval.
              </p>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                Submit
              </Button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{comment.userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <MessageSquare size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#FEF4E8] py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`}>
                  <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden h-full">
                    <div className="relative h-40 overflow-hidden">
                      {relatedBlog.thumbnail ? (
                        <Image
                          src={relatedBlog.thumbnail}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        {relatedBlog.category && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                            {relatedBlog.category}
                          </span>
                        )}
                        <span>{relatedBlog.readingTime} min</span>
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to Discuss Agri Marketing Strategies?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our team is ready to help your brand connect with farmers across India.
          </p>
          <Link href="/#contact-us">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>
    </article>
  );
}