"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Blog } from '@/types/blog';
import { fetchBlogs, deleteBlog, updateBlog } from '@/lib/blog-storage';
import {
  Plus, Search, Edit3, Trash2, Eye, Calendar,
  Clock, FileText, User, ChevronLeft, Loader2,
  AlertCircle, Check, Filter, Download,
  RefreshCw, ExternalLink, EyeOff, LogOut, MessageSquare, Heart
} from 'lucide-react';

interface AdminData {
  id: string;
  email: string;
  name: string;
}

export default function BlogManagement() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/session');
        const data = await response.json() as { authenticated?: boolean; admin?: AdminData };
        
        if (data.authenticated && data.admin) {
          setIsAuthenticated(true);
          setAdmin(data.admin);
        } else {
          router.push('/services/digixblog/login');
        }
      } catch {
        router.push('/services/digixblog/login');
      }
    };
    
    void checkAuth();
  }, [router]);

  // Fetch blogs
  const loadBlogs = useCallback(async () => {
    setIsLoading(true);
    const allBlogs = await fetchBlogs();
    setBlogs(allBlogs);
    setFilteredBlogs(allBlogs);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void loadBlogs();
    }
  }, [isAuthenticated, loadBlogs]);

  // Filter blogs
  useEffect(() => {
    let result = blogs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.author?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(blog => blog.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      result = result.filter(blog => blog.category === categoryFilter);
    }

    setFilteredBlogs(result);
  }, [blogs, searchQuery, statusFilter, categoryFilter]);

  const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  // Logout
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/services/digixblog/login');
  };

  // Refresh blogs
  const refreshBlogs = async () => {
    setIsLoading(true);
    const allBlogs = await fetchBlogs();
    setBlogs(allBlogs);
    setFilteredBlogs(allBlogs);
    setMessage({ type: 'success', text: 'Blogs refreshed' });
    setIsLoading(false);
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const deleted = await deleteBlog(id);
    
    if (deleted) {
      setBlogs(prev => prev.filter(b => b.id !== id));
      setMessage({ type: 'success', text: 'Blog deleted successfully' });
    } else {
      setMessage({ type: 'error', text: 'Failed to delete blog' });
    }
    
    setDeletingId(null);
    setShowDeleteModal(false);
    setSelectedBlog(null);
  };

  // Toggle publish status
  const toggleStatus = async (blog: Blog) => {
    setTogglingId(blog.id);
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    const updated = await updateBlog(blog.id, { status: newStatus });
    
    if (updated) {
      setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, status: newStatus, updatedAt: new Date().toISOString() } : b));
      setMessage({ type: 'success', text: `Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully` });
    } else {
      setMessage({ type: 'error', text: 'Failed to update blog status' });
    }
    
    setTogglingId(null);
  };

  // Export
  const exportAllBlogs = () => {
    const data = JSON.stringify({ blogs }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blogs-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft size={24} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Blog Management</h1>
                <p className="text-sm text-muted-foreground">Welcome, {admin?.name ?? 'Admin'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/services/digixblog/comments">
                <Button variant="outline" className="gap-2" size="sm">
                  <MessageSquare size={16} />
                  <span className="hidden sm:inline">Comments</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={exportAllBlogs}
                className="gap-2"
                disabled={blogs.length === 0}
                size="sm"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => void refreshBlogs()}
                className="gap-2"
                size="sm"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>

              <Link href="/services/digixblog">
                <Button className="gap-2" size="sm">
                  <Plus size={16} />
                  Create
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={() => void handleLogout()}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                size="sm"
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>

          {message && (
            <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-3 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {categories.length > 0 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{blogs.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {blogs.filter(b => b.status === 'published').length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit3 size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {blogs.filter(b => b.status === 'draft').length}
                </p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart size={20} className="text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {blogs.reduce((sum, b) => sum + (b.likesCount || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {blogs.length === 0 ? 'No blogs yet' : 'No blogs found'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {blogs.length === 0
                ? 'Create your first blog post to get started'
                : 'Try adjusting your search or filter criteria'}
            </p>
            {blogs.length === 0 && (
              <Link href="/services/digixblog">
                <Button className="gap-2">
                  <Plus size={16} />
                  Create Your First Blog
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={160}
                        height={100}
                        className="w-full md:w-40 h-32 md:h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full md:w-40 h-32 md:h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            blog.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {blog.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                          {blog.category && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                              {blog.category}
                            </span>
                          )}
                          {blog.likesCount > 0 && (
                            <span className="px-2 py-0.5 bg-pink-50 text-pink-600 rounded-full text-xs font-medium flex items-center gap-1">
                              <Heart size={10} fill="currentColor" />
                              {blog.likesCount}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                          {blog.title}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          {blog.author && (
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {blog.author}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {blog.readingTime} min
                          </span>
                        </div>

                        {blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {blog.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0 flex-wrap">
                        {blog.status === 'published' && (
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Live"
                          >
                            <ExternalLink size={18} className="text-blue-600" />
                          </a>
                        )}

                        <button
                          onClick={() => void toggleStatus(blog)}
                          disabled={togglingId === blog.id}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                          title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {togglingId === blog.id ? (
                            <Loader2 size={18} className="animate-spin text-gray-400" />
                          ) : blog.status === 'published' ? (
                            <EyeOff size={18} className="text-orange-500" />
                          ) : (
                            <Eye size={18} className="text-green-600" />
                          )}
                        </button>

                        <Link
                          href={`/services/digixblog/edit/${blog.id}`}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={18} className="text-blue-600" />
                        </Link>

                        <button
                          onClick={() => {
                            setSelectedBlog(blog);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Modal */}
      {showDeleteModal && selectedBlog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Blog</h3>
                <p className="text-sm text-muted-foreground">This cannot be undone</p>
              </div>
            </div>

            <p className="text-foreground mb-6">
              Delete &ldquo;<span className="font-semibold">{selectedBlog.title}</span>&rdquo;?
            </p>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <button
                onClick={() => void handleDelete(selectedBlog.id)}
                disabled={deletingId === selectedBlog.id}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors disabled:opacity-50"
              >
                {deletingId === selectedBlog.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}