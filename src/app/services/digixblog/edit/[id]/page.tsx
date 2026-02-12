"use client";

import { useState, useRef, useCallback, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { Blog } from '@/types/blog';
import {
  fetchBlog,
  updateBlog,
  calculateReadingStats,
} from '@/lib/blog-storage';
import {
  Bold, Italic, List, Link as LinkIcon, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, Eye, Save,
  FileImage, Quote, Heading1, Heading2, Heading3,
  Undo, Redo, ListOrdered, Minus,
  FileText, Clock, Check, AlertCircle, X,
  Download, Edit3, ChevronLeft, Loader2, Smile,
  Type, Palette, Video, FileDown, Subscript, Superscript,
  Highlighter, Code, AlignJustify
} from 'lucide-react';

// Common emojis organized by category
const EMOJI_DATA = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛', '😜'],
  'Gestures': ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎'],
  'Nature': ['🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🌺', '🌻', '🌼', '🌷', '🌹', '🥀', '💐', '🍄'],
  'Agri': ['🌾', '🚜', '🌻', '🌽', '🥕', '🥬', '🍅', '🌱', '💧', '☀️', '🌧️', '🐄', '🐔', '🐖', '🐑', '🐐', '🦆', '🐝', '🦋', '🐛'],
};

// Font families
const FONT_FAMILIES = [
  { name: 'Default', value: '' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
];

// Font sizes
const FONT_SIZES = [
  { name: 'Small', value: '1' },
  { name: 'Normal', value: '3' },
  { name: 'Large', value: '5' },
  { name: 'Huge', value: '7' },
];

// Text colors
const TEXT_COLORS = [
  '#000000', '#434343', '#666666', '#999999',
  '#e06666', '#f6b26b', '#ffd966', '#93c47d',
  '#cc0000', '#e69138', '#f1c232', '#6aa84f',
  '#990000', '#b45f06', '#bf9000', '#38761d',
];

// Highlight colors
const HIGHLIGHT_COLORS = [
  '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ff0000', '#0000ff',
  '#fce5cd', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc',
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlog({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  // Form States
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Dropdown States
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [emojiCategory, setEmojiCategory] = useState('Smileys');
  
  // Floating Toolbar and Drag state
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [floatingToolbarPos, setFloatingToolbarPos] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // FIX: Restore editor content when switching back from preview mode  
  useEffect(() => {
    if (!isPreviewMode && editorRef.current && content && !isLoading) {
      editorRef.current.innerHTML = content;
    }
  }, [isPreviewMode, content, isLoading]);

  // Handle text selection for floating toolbar
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !editorRef.current) {
        setShowFloatingToolbar(false);
        return;
      }
      
      const text = selection.toString().trim();
      if (!text) {
        setShowFloatingToolbar(false);
        return;
      }
      
      const range = selection.getRangeAt(0);
      if (!editorRef.current.contains(range.commonAncestorContainer)) {
        setShowFloatingToolbar(false);
        return;
      }
      
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      
      setFloatingToolbarPos({
        top: rect.top - editorRect.top - 50,
        left: Math.min(Math.max(rect.left - editorRect.left + rect.width / 2 - 150, 10), editorRect.width - 310),
      });
      setShowFloatingToolbar(true);
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

  // Fetch blog data from Supabase via API
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blog = await fetchBlog(id);
        
        if (blog) {
          loadBlogData(blog);
        } else {
          setSaveMessage({ type: 'error', text: 'Blog not found' });
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setSaveMessage({ type: 'error', text: 'Failed to load blog' });
      } finally {
        setIsLoading(false);
      }
    };
    
    void loadBlog();
  }, [id]);

  const loadBlogData = (blog: Blog) => {
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setAuthor(blog.author);
    setCategory(blog.category);
    setTags(blog.tags.join(', '));
    setThumbnail(blog.thumbnail);
    setMetaTitle(blog.metaTitle);
    setMetaDescription(blog.metaDescription);
    setSlug(blog.slug);
    setStatus(blog.status);
    setHistory([blog.content]);
    
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = blog.content;
      }
    }, 100);
  };

  // Calculate statistics
  const { wordCount, readingTime } = calculateReadingStats(content);
  const charCount = content.replace(/<[^>]*>/g, '').length;

  // History Management
  const updateHistory = useCallback((value: string) => {
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(value);
    if (newHist.length > 50) newHist.shift();
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      const val = history[idx];
      if (val !== undefined) {
        setHistoryIndex(idx);
        setContent(val);
        if (editorRef.current) editorRef.current.innerHTML = val;
      }
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      const val = history[idx];
      if (val !== undefined) {
        setHistoryIndex(idx);
        setContent(val);
        if (editorRef.current) editorRef.current.innerHTML = val;
      }
    }
  }, [historyIndex, history]);

  // Format Text
  const formatText = useCallback((format: string, value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    switch (format) {
      case 'bold': document.execCommand('bold'); break;
      case 'italic': document.execCommand('italic'); break;
      case 'underline': document.execCommand('underline'); break;
      case 'strikethrough': document.execCommand('strikeThrough'); break;
      case 'subscript': document.execCommand('subscript'); break;
      case 'superscript': document.execCommand('superscript'); break;
      case 'h1': document.execCommand('formatBlock', false, '<h1>'); break;
      case 'h2': document.execCommand('formatBlock', false, '<h2>'); break;
      case 'h3': document.execCommand('formatBlock', false, '<h3>'); break;
      case 'ul': document.execCommand('insertUnorderedList'); break;
      case 'ol': document.execCommand('insertOrderedList'); break;
      case 'quote': document.execCommand('formatBlock', false, '<blockquote>'); break;
      case 'code': document.execCommand('formatBlock', false, '<pre>'); break;
      case 'alignLeft': document.execCommand('justifyLeft'); break;
      case 'alignCenter': document.execCommand('justifyCenter'); break;
      case 'alignRight': document.execCommand('justifyRight'); break;
      case 'alignJustify': document.execCommand('justifyFull'); break;
      case 'hr': document.execCommand('insertHTML', false, '<hr class="my-4 border-gray-300">'); break;
      case 'fontName': 
        if (value) document.execCommand('fontName', false, value);
        break;
      case 'fontSize':
        if (value) document.execCommand('fontSize', false, value);
        break;
      case 'foreColor':
        if (value) document.execCommand('foreColor', false, value);
        break;
      case 'hiliteColor':
        if (value) document.execCommand('hiliteColor', false, value);
        break;
      case 'link': {
        const url = prompt('Enter URL:');
        if (url) {
          const text = window.getSelection()?.toString() || prompt('Link text:') || url;
          const html = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${text}</a>`;
          document.execCommand('insertHTML', false, html);
        }
        break;
      }
      default: break;
    }

    setTimeout(() => {
      const updated = editor.innerHTML;
      setContent(updated);
      updateHistory(updated);
    }, 10);
  }, [updateHistory]);

  // Insert HTML at cursor position
  const insertHTMLAtCursor = useCallback((html: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand('insertHTML', false, html);
    setTimeout(() => {
      const updated = editor.innerHTML;
      setContent(updated);
      updateHistory(updated);
    }, 10);
  }, [updateHistory]);

  // Insert Emoji
  const insertEmoji = (emoji: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand('insertText', false, emoji);
    
    setTimeout(() => {
      const updated = editor.innerHTML;
      setContent(updated);
      updateHistory(updated);
    }, 10);
  };

  // Insert Video
  const insertVideo = () => {
    const editor = editorRef.current;
    if (!editor || !videoUrl) return;
    editor.focus();

    let embedHtml = '';
    
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = youtubeRegex.exec(videoUrl);
    if (youtubeMatch) {
      embedHtml = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 24px 0; border-radius: 12px;">
          <iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 12px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    } else if (/\.(mp4|webm|ogg)$/i.test(videoUrl)) {
      embedHtml = `
        <div style="margin: 24px 0;">
          <video controls style="max-width: 100%; border-radius: 12px;">
            <source src="${videoUrl}" type="video/${videoUrl.split('.').pop()}">
          </video>
        </div>
      `;
    }

    if (embedHtml) {
      document.execCommand('insertHTML', false, embedHtml);
      setTimeout(() => {
        const updated = editor.innerHTML;
        setContent(updated);
        updateHistory(updated);
      }, 10);
    }

    setVideoUrl('');
    setShowVideoModal(false);
  };

  // Image Handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, forThumbnail = false) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
          if (forThumbnail) {
            setThumbnail(ev.target.result);
          } else {
            insertImage(ev.target.result, file.name);
          }
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const insertImage = (url: string, alt: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const html = `
      <figure style="margin: 24px 0; text-align: center;">
        <img src="${url}" alt="${alt}" style="max-width:100%; border-radius:12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
        <figcaption style="font-size:14px; color:#666; margin-top:8px; font-style: italic;">${alt}</figcaption>
      </figure>
    `;

    document.execCommand('insertHTML', false, html);

    setTimeout(() => {
      const updated = editor.innerHTML;
      setContent(updated);
      updateHistory(updated);
    }, 10);
  };

  // Video file upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
          const editor = editorRef.current;
          if (!editor) return;
          editor.focus();
          
          const html = `
            <div style="margin: 24px 0;">
              <video controls style="max-width: 100%; border-radius: 12px;">
                <source src="${ev.target.result}" type="${file.type}">
              </video>
            </div>
          `;
          
          document.execCommand('insertHTML', false, html);
          
          setTimeout(() => {
            const updated = editor.innerHTML;
            setContent(updated);
            updateHistory(updated);
          }, 10);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  // Save Blog to Supabase via API
  const saveBlog = useCallback(async (newStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      setSaveMessage({ type: 'error', text: 'Please enter a title' });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    const blogData = {
      title,
      subtitle,
      content,
      author,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      thumbnail,
      metaTitle: metaTitle || title,
      metaDescription,
      slug,
      status: newStatus || status,
    };

    try {
      const updated = await updateBlog(id, blogData);

      if (updated) {
        if (newStatus) setStatus(newStatus);
        setSaveMessage({ type: 'success', text: 'Blog updated successfully!' });
        setTimeout(() => {
          router.push('/services/digixblog/manage');
        }, 1500);
      } else {
        setSaveMessage({ type: 'error', text: 'Failed to update blog. Please try again.' });
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setSaveMessage({ type: 'error', text: 'Failed to update blog. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  }, [id, title, subtitle, content, author, category, tags, thumbnail, metaTitle, metaDescription, slug, status, router]);

  // Export as PDF
  const exportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export PDF');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title || 'Blog Post'}</title>
          <style>
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
            body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.8; color: #333; }
            h1 { font-size: 32px; margin-bottom: 8px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #eee; }
            .content img { max-width: 100%; border-radius: 8px; }
            .tags { margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; }
            .tag { display: inline-block; background: #FEF4E8; color: #E07B00; padding: 4px 12px; border-radius: 16px; font-size: 12px; margin-right: 8px; }
            @page { margin: 2cm; }
          </style>
        </head>
        <body>
          ${thumbnail ? `<img src="${thumbnail}" alt="${title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />` : ''}
          <h1>${title}</h1>
          ${subtitle ? `<p style="font-size: 18px; color: #666;">${subtitle}</p>` : ''}
          <div class="meta">${author ? `By ${author} • ` : ''}${category ? `${category} • ` : ''}${readingTime} min read</div>
          <div class="content">${content}</div>
          ${tags ? `<div class="tags">${tags.split(',').map(t => `<span class="tag">#${t.trim()}</span>`).join('')}</div>` : ''}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  // Export as JSON
  const exportJSON = () => {
    const data = { title, subtitle, slug, content, author, category, tags: tags.split(',').map(t => t.trim()).filter(Boolean), thumbnail, metaTitle, metaDescription, wordCount, readingTime, updatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug || 'blog'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') { e.preventDefault(); formatText('bold'); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'i') { e.preventDefault(); formatText('italic'); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'u') { e.preventDefault(); formatText('underline'); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); void saveBlog(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [formatText, undo, redo, saveBlog]);

  // Toolbar Button
  const ToolbarButton = ({ onClick, icon: Icon, title, disabled = false }: { onClick: () => void; icon: React.ElementType; title: string; disabled?: boolean }) => (
    <button onClick={onClick} disabled={disabled} className={`p-2 rounded-lg transition-all ${disabled ? 'opacity-40 cursor-not-allowed text-gray-400' : 'hover:bg-primary/10 text-foreground hover:text-primary'}`} title={title} type="button">
      <Icon size={18} />
    </button>
  );

  if (isLoading) {
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
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <Link href="/services/digixblog/manage" className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft size={24} />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">Edit Blog</h1>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Update your blog post</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)} className="gap-2" size="sm">
                {isPreviewMode ? <Edit3 size={16} /> : <Eye size={16} />}
                {isPreviewMode ? 'Edit' : 'Preview'}
              </Button>
              
              <div className="relative group">
                <Button variant="outline" className="gap-2" size="sm">
                  <Download size={16} />
                  Export
                </Button>
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg py-1 hidden group-hover:block min-w-[140px] z-20">
                  <button onClick={exportPDF} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <FileDown size={14} />
                    Export as PDF
                  </button>
                  <button onClick={exportJSON} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <FileText size={14} />
                    Export as JSON
                  </button>
                </div>
              </div>
              
              <Button variant="outline" onClick={() => void saveBlog('draft')} disabled={isSaving} className="gap-2" size="sm">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Draft
              </Button>
              
              <Button onClick={() => void saveBlog('published')} disabled={isSaving} className="gap-2" size="sm">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {status === 'published' ? 'Update' : 'Publish'}
              </Button>
            </div>
          </div>
          
          {saveMessage && (
            <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {saveMessage.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
              {saveMessage.text}
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {!isPreviewMode ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Subtitle */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
                <input type="text" placeholder="Enter your blog title..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-3xl font-bold outline-none border-b-2 border-transparent focus:border-primary pb-2 transition-colors" />
                <input type="text" placeholder="Add a subtitle (optional)" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full text-lg text-muted-foreground outline-none" />
              </div>

              {/* Toolbar - STICKY */}
              <div ref={toolbarRef} className="bg-white rounded-2xl shadow-sm border p-4 overflow-x-auto sticky top-[85px] z-40">
                <div className="flex flex-wrap items-center gap-1 min-w-max">
                  <ToolbarButton onClick={undo} icon={Undo} title="Undo (Ctrl+Z)" disabled={historyIndex <= 0} />
                  <ToolbarButton onClick={redo} icon={Redo} title="Redo (Ctrl+Y)" disabled={historyIndex >= history.length - 1} />
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  {/* Font Family */}
                  <div className="relative">
                    <button onClick={() => setShowFontPicker(!showFontPicker)} className={`p-2 rounded-lg transition-all hover:bg-primary/10 ${showFontPicker ? 'bg-primary/10' : ''}`} title="Font Family">
                      <Type size={18} />
                    </button>
                    {showFontPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl z-30 w-48 py-1">
                        {FONT_FAMILIES.map((font) => (
                          <button key={font.name} onClick={() => { formatText('fontName', font.value); setShowFontPicker(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" style={{ fontFamily: font.value || 'inherit' }}>
                            {font.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Font Size */}
                  <div className="relative">
                    <button onClick={() => setShowSizePicker(!showSizePicker)} className={`px-2 py-1 rounded-lg text-sm font-medium hover:bg-primary/10 ${showSizePicker ? 'bg-primary/10' : ''}`} title="Font Size">Size</button>
                    {showSizePicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl z-30 w-32 py-1">
                        {FONT_SIZES.map((size) => (
                          <button key={size.name} onClick={() => { formatText('fontSize', size.value); setShowSizePicker(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">{size.name}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  <ToolbarButton onClick={() => formatText('bold')} icon={Bold} title="Bold (Ctrl+B)" />
                  <ToolbarButton onClick={() => formatText('italic')} icon={Italic} title="Italic (Ctrl+I)" />
                  <ToolbarButton onClick={() => formatText('underline')} icon={Underline} title="Underline (Ctrl+U)" />
                  <ToolbarButton onClick={() => formatText('strikethrough')} icon={Strikethrough} title="Strikethrough" />
                  <ToolbarButton onClick={() => formatText('subscript')} icon={Subscript} title="Subscript" />
                  <ToolbarButton onClick={() => formatText('superscript')} icon={Superscript} title="Superscript" />
                  
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  {/* Text Color */}
                  <div className="relative">
                    <button onClick={() => setShowColorPicker(!showColorPicker)} className={`p-2 rounded-lg hover:bg-primary/10 ${showColorPicker ? 'bg-primary/10' : ''}`} title="Text Color">
                      <Palette size={18} />
                    </button>
                    {showColorPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl z-30 p-3 w-40">
                        <p className="text-xs font-medium text-gray-500 mb-2">Text Color</p>
                        <div className="grid grid-cols-4 gap-1">
                          {TEXT_COLORS.map((color) => (
                            <button key={color} onClick={() => { formatText('foreColor', color); setShowColorPicker(false); }} className="w-6 h-6 rounded border hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Highlight */}
                  <div className="relative">
                    <button onClick={() => setShowHighlightPicker(!showHighlightPicker)} className={`p-2 rounded-lg hover:bg-primary/10 ${showHighlightPicker ? 'bg-primary/10' : ''}`} title="Highlight">
                      <Highlighter size={18} />
                    </button>
                    {showHighlightPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl z-30 p-3 w-40">
                        <div className="grid grid-cols-6 gap-1">
                          {HIGHLIGHT_COLORS.map((color) => (
                            <button key={color} onClick={() => { formatText('hiliteColor', color); setShowHighlightPicker(false); }} className="w-5 h-5 rounded border hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  <ToolbarButton onClick={() => formatText('h1')} icon={Heading1} title="Heading 1" />
                  <ToolbarButton onClick={() => formatText('h2')} icon={Heading2} title="Heading 2" />
                  <ToolbarButton onClick={() => formatText('h3')} icon={Heading3} title="Heading 3" />
                  
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  <ToolbarButton onClick={() => formatText('ul')} icon={List} title="Bullet List" />
                  <ToolbarButton onClick={() => formatText('ol')} icon={ListOrdered} title="Numbered List" />
                  <ToolbarButton onClick={() => formatText('quote')} icon={Quote} title="Quote" />
                  <ToolbarButton onClick={() => formatText('code')} icon={Code} title="Code Block" />
                  
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  <ToolbarButton onClick={() => formatText('link')} icon={LinkIcon} title="Insert Link" />
                  <ToolbarButton onClick={() => formatText('hr')} icon={Minus} title="Horizontal Rule" />
                  
                  <label className="p-2 rounded-lg hover:bg-primary/10 cursor-pointer" title="Upload Image">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="hidden" />
                    <FileImage size={18} />
                  </label>

                  <button onClick={() => setShowVideoModal(true)} className="p-2 rounded-lg hover:bg-primary/10" title="Insert Video">
                    <Video size={18} />
                  </button>

                  <label className="p-2 rounded-lg hover:bg-primary/10 cursor-pointer" title="Upload Video">
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                    <FileDown size={18} />
                  </label>
                  
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  <ToolbarButton onClick={() => formatText('alignLeft')} icon={AlignLeft} title="Align Left" />
                  <ToolbarButton onClick={() => formatText('alignCenter')} icon={AlignCenter} title="Align Center" />
                  <ToolbarButton onClick={() => formatText('alignRight')} icon={AlignRight} title="Align Right" />
                  <ToolbarButton onClick={() => formatText('alignJustify')} icon={AlignJustify} title="Justify" />
                  
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  
                  {/* Emoji Picker */}
                  <div className="relative">
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`p-2 rounded-lg hover:bg-primary/10 ${showEmojiPicker ? 'bg-primary/10' : ''}`} title="Insert Emoji">
                      <Smile size={18} />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute top-full right-0 mt-1 bg-white border rounded-xl shadow-xl z-30 p-4 w-72">
                        <div className="flex gap-1 mb-3 overflow-x-auto pb-2">
                          {Object.keys(EMOJI_DATA).map((cat) => (
                            <button key={cat} onClick={() => setEmojiCategory(cat)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${emojiCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{cat}</button>
                          ))}
                        </div>
                        <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
                          {EMOJI_DATA[emojiCategory as keyof typeof EMOJI_DATA].map((emoji, idx) => (
                            <button key={idx} onClick={() => { insertEmoji(emoji); setShowEmojiPicker(false); }} className="text-xl p-1 hover:bg-gray-100 rounded">{emoji}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Editor with Floating Toolbar and Drag-Drop */}
              <div 
                className={`bg-white rounded-2xl shadow-sm border p-6 relative transition-all ${isDragging ? 'ring-2 ring-primary ring-offset-2 bg-primary/5' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const files = Array.from(e.dataTransfer.files);
                  files.forEach(file => {
                    if (file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (typeof ev.target?.result === 'string') {
                          const html = `<figure style="margin: 24px 0; text-align: center;"><img src="${ev.target.result}" alt="${file.name}" style="max-width:100%; border-radius:12px;" /><figcaption style="font-size:14px; color:#666; margin-top:8px;">${file.name}</figcaption></figure>`;
                          insertHTMLAtCursor(html);
                        }
                      };
                      reader.readAsDataURL(file);
                    } else if (file.type.startsWith('video/')) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (typeof ev.target?.result === 'string') {
                          const html = `<div style="margin: 24px 0;"><video controls style="max-width: 100%; border-radius: 12px;"><source src="${ev.target.result}" type="${file.type}"></video></div>`;
                          insertHTMLAtCursor(html);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  });
                }}
              >
                {/* Drag overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl flex items-center justify-center z-10 pointer-events-none">
                    <div className="text-center">
                      <FileImage size={48} className="mx-auto text-primary mb-2" />
                      <p className="text-primary font-medium">Drop images or videos here</p>
                    </div>
                  </div>
                )}

                {/* Floating Toolbar - appears on text selection */}
                {showFloatingToolbar && (
                  <div 
                    className="absolute z-50 bg-gray-900 text-white rounded-xl shadow-2xl px-2 py-1.5 flex items-center gap-1"
                    style={{ top: floatingToolbarPos.top, left: floatingToolbarPos.left }}
                  >
                    <button onClick={() => formatText('bold')} className="p-2 rounded hover:bg-white/20" title="Bold"><Bold size={16} /></button>
                    <button onClick={() => formatText('italic')} className="p-2 rounded hover:bg-white/20" title="Italic"><Italic size={16} /></button>
                    <button onClick={() => formatText('underline')} className="p-2 rounded hover:bg-white/20" title="Underline"><Underline size={16} /></button>
                    <button onClick={() => formatText('strikethrough')} className="p-2 rounded hover:bg-white/20" title="Strikethrough"><Strikethrough size={16} /></button>
                    <div className="w-px h-5 bg-gray-600 mx-1" />
                    <button onClick={() => formatText('h2')} className="p-2 rounded hover:bg-white/20" title="Heading"><Heading2 size={16} /></button>
                    <button onClick={() => formatText('quote')} className="p-2 rounded hover:bg-white/20" title="Quote"><Quote size={16} /></button>
                    <button onClick={() => formatText('link')} className="p-2 rounded hover:bg-white/20" title="Link"><LinkIcon size={16} /></button>
                    <div className="w-px h-5 bg-gray-600 mx-1" />
                    <button onClick={() => formatText('hiliteColor', '#ffff00')} className="p-2 rounded hover:bg-white/20" title="Highlight"><Highlighter size={16} /></button>
                  </div>
                )}

                <div ref={editorRef} contentEditable onInput={(e) => { const updated = e.currentTarget.innerHTML; setContent(updated); updateHistory(updated); }}
                  className="min-h-[500px] outline-none prose prose-lg max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:bg-[#FEF4E8] [&_blockquote]:py-3 [&_blockquote]:rounded-r-lg [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_video]:rounded-lg [&_video]:my-4 [&_video]:max-w-full"
                  suppressContentEditableWarning
                  data-placeholder="Start writing your blog post... You can drag and drop images and videos here!"
                />
              </div>

              {/* Stats */}
              <div className="bg-[#FEF4E8] rounded-2xl p-4 flex items-center gap-6 text-sm flex-wrap">
                <div className="flex items-center gap-2"><FileText size={16} className="text-primary" /><span className="font-medium">{wordCount} words</span></div>
                <div className="flex items-center gap-2"><span className="text-muted-foreground">{charCount} characters</span></div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-primary" /><span className="font-medium">{readingTime} min read</span></div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Details */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Post Details</h3>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Author</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all">
                    <option value="">Select category</option>
                    {BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Tags (comma-separated)</label>
                  <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="agriculture, marketing" className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all" />
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Cover Image</h3>
                {thumbnail ? (
                  <div className="relative group">
                    <Image src={thumbnail} alt="Cover" width={400} height={200} className="w-full h-40 object-cover rounded-lg" />
                    <button onClick={() => setThumbnail(null)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                  </div>
                ) : (
                  <label className="block border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                    <FileImage size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload cover image</p>
                  </label>
                )}
              </div>

              {/* SEO Settings */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
                <h3 className="font-semibold text-foreground">SEO Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">URL Slug</label>
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50">
                    <span className="text-muted-foreground text-sm">/blog/</span>
                    <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Meta Title</label>
                  <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={title || "Enter meta title"} className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Meta Description</label>
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Description for search engines..." rows={3} className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all text-sm resize-none" />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#FEF4E8] rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/services/digixblog/manage" className="flex items-center gap-2 text-sm text-primary hover:underline"><FileText size={16} />Back to Blog List</Link>
                  <Link href="/services/digixblog" className="flex items-center gap-2 text-sm text-primary hover:underline"><Edit3 size={16} />Create New Blog</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border p-8 md:p-12">
              {thumbnail && <Image src={thumbnail} alt={title} width={800} height={400} className="w-full h-64 md:h-80 object-cover rounded-xl mb-8" />}
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4 flex-wrap">
                {category && <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{category}</span>}
                <span>{readingTime} min read</span><span>•</span><span>{new Date().toLocaleDateString()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title || 'Untitled'}</h1>
              {subtitle && <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">{subtitle}</h2>}
              {author && (
                <div className="flex items-center gap-3 mb-8 pb-8 border-b">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">{author.charAt(0).toUpperCase()}</div>
                  <div><p className="font-semibold text-foreground">{author}</p><p className="text-sm text-muted-foreground">Author</p></div>
                </div>
              )}
              <div className="prose prose-lg max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_video]:rounded-lg" dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 italic">No content yet...</p>' }} />
              {tags && (
                <div className="mt-12 pt-6 border-t">
                  <p className="font-semibold text-foreground mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.split(',').map((tag, idx) => { const t = tag.trim(); return t ? <span key={idx} className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">#{t}</span> : null; })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && setShowVideoModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insert Video</h3>
              <button onClick={() => setShowVideoModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Video URL (YouTube, Vimeo, or direct link)</label>
                <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <Button variant="outline" onClick={() => setShowVideoModal(false)}>Cancel</Button>
                <Button onClick={insertVideo} disabled={!videoUrl.trim()}>Insert Video</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}