"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { BlogComment } from '@/types/blog';
import {
  ChevronLeft, Loader2, AlertCircle, Check, Filter,
  RefreshCw, LogOut, MessageSquare, Trash2, CheckCircle, XCircle,
  Clock, User, Calendar, ExternalLink, Bell, BellRing
} from 'lucide-react';

interface CommentWithBlog extends BlogComment {
  blogTitle?: string;
  blogSlug?: string;
}

interface AdminData {
  id: string;
  email: string;
  name: string;
}

export default function CommentsManagement() {
  const router = useRouter();
  const [comments, setComments] = useState<CommentWithBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setAdmin] = useState<AdminData | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Check auth
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

  // Fetch comments
  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = statusFilter === 'all' 
        ? '/api/admin/comments' 
        : `/api/admin/comments?status=${statusFilter}`;
      
      const response = await fetch(url);
      const data = await response.json() as { success?: boolean; comments?: CommentWithBlog[] };
      
      if (data.success && data.comments) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
    setIsLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      void loadComments();
    }
  }, [isAuthenticated, statusFilter, loadComments]);

  // Logout
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/services/digixblog/login');
  };

  // Approve comment
  const approveComment = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      
      const data = await response.json() as { success?: boolean };
      
      if (data.success) {
        setComments(prev => prev.map(c => 
          c.id === id ? { ...c, status: 'approved' as const } : c
        ));
        setMessage({ type: 'success', text: 'Comment approved' });
      } else {
        setMessage({ type: 'error', text: 'Failed to approve comment' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to approve comment' });
    }
    setProcessingId(null);
  };

  // Reject comment
  const rejectComment = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      
      const data = await response.json() as { success?: boolean };
      
      if (data.success) {
        setComments(prev => prev.map(c => 
          c.id === id ? { ...c, status: 'rejected' as const } : c
        ));
        setMessage({ type: 'success', text: 'Comment rejected' });
      } else {
        setMessage({ type: 'error', text: 'Failed to reject comment' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to reject comment' });
    }
    setProcessingId(null);
  };

  // Delete comment
  const deleteComment = async (id: string) => {
    if (!confirm('Delete this comment permanently?')) return;
    
    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json() as { success?: boolean };
      
      if (data.success) {
        setComments(prev => prev.filter(c => c.id !== id));
        setMessage({ type: 'success', text: 'Comment deleted' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete comment' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete comment' });
    }
    setProcessingId(null);
  };

  // Clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Count by status
  const pendingCount = comments.filter(c => c.status === 'pending').length;

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
              <Link href="/services/digixblog/manage" className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft size={24} />
              </Link>
              {/* Notification Bell */}
              <div className="relative">
                {pendingCount > 0 ? (
                  <div className="p-2 bg-orange-100 rounded-full animate-pulse">
                    <BellRing size={24} className="text-orange-500" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                      {pendingCount > 99 ? '99+' : pendingCount}
                    </span>
                  </div>
                ) : (
                  <div className="p-2 bg-green-100 rounded-full">
                    <Bell size={24} className="text-green-500" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Comments</h1>
                <p className="text-sm text-muted-foreground">
                  {pendingCount > 0 ? (
                    <span className="text-orange-600 font-medium">{pendingCount} pending approval</span>
                  ) : (
                    <span className="text-green-600">All caught up!</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => void loadComments()}
                className="gap-2"
                size="sm"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>

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
        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-foreground'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'pending' && pendingCount > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Comments List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No comments
            </h3>
            <p className="text-muted-foreground">
              {statusFilter === 'pending' 
                ? 'No comments awaiting approval'
                : `No ${statusFilter === 'all' ? '' : statusFilter} comments found`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        comment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : comment.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                      </span>
                      
                      {comment.blogTitle && (
                        <Link
                          href={`/blog/${comment.blogSlug}`}
                          target="_blank"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          {comment.blogTitle}
                          <ExternalLink size={10} />
                        </Link>
                      )}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{comment.userName}</p>
                        {comment.userEmail && (
                          <p className="text-xs text-muted-foreground">{comment.userEmail}</p>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-foreground mb-3 whitespace-pre-wrap">
                      {comment.content}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(comment.createdAt).toLocaleTimeString()}
                      </span>
                      {comment.approvedBy && (
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {comment.status === 'approved' ? 'Approved' : 'Rejected'} by {comment.approvedBy}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center gap-2 flex-shrink-0">
                    {comment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => void approveComment(comment.id)}
                          disabled={processingId === comment.id}
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          {processingId === comment.id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <CheckCircle size={18} />
                          )}
                        </button>
                        
                        <button
                          onClick={() => void rejectComment(comment.id)}
                          disabled={processingId === comment.id}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => void deleteComment(comment.id)}
                      disabled={processingId === comment.id}
                      className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}