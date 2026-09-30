import React, { useEffect, useState } from 'react';
import { X, Heart, Clock, Calendar, Share2, Edit3, Check } from 'lucide-react';

export default function PostDetailModal({
  post,
  onClose,
  onEditPost,
  onLikePost,
}) {
  const [likes, setLikes] = useState(post?.likes || 0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (post) setLikes(post.likes || 0);
  }, [post]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleLike = async () => {
    setLikes((prev) => prev + 1);
    if (onLikePost) {
      await onLikePost(post._id);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render paragraphs with markdown-like formatting
  const renderFormattedContent = (content) => {
    const sections = content.split('\n\n');
    return sections.map((sec, idx) => {
      if (sec.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="font-serif text-xl sm:text-2xl font-bold text-ink mt-8 mb-3"
          >
            {sec.replace('### ', '')}
          </h3>
        );
      }
      if (sec.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-9 mb-4"
          >
            {sec.replace('## ', '')}
          </h2>
        );
      }
      if (sec.startsWith('- ') || sec.startsWith('* ')) {
        const items = sec.split('\n');
        return (
          <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-ink-muted">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {item.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-base sm:text-lg text-ink-muted leading-relaxed mb-6 font-normal">
          {sec}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div
        className="relative bg-paper-card w-full max-w-3xl rounded-3xl border border-paper-border shadow-paper-lg overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="sticky top-0 bg-paper-card/90 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-paper-border flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-paper-muted text-ink-muted border border-paper-border">
              {post.category}
            </span>
            <span className="text-xs text-ink-faint flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-ink-muted hover:bg-paper-muted hover:text-ink transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Share / Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onEditPost(post);
              }}
              className="p-2 rounded-xl text-ink-muted hover:bg-paper-muted hover:text-ink transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Edit story"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-ink-muted hover:bg-paper-muted hover:text-ink transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Article Content */}
        <div className="px-6 sm:px-12 py-8 sm:py-10 max-h-[80vh] overflow-y-auto">
          {/* Article Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center gap-3 py-4 mb-8 border-y border-paper-border">
            <div className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center font-serif text-sm font-bold">
              {post.author ? post.author.split(' ').map((n) => n[0]).join('') : 'KT'}
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">
                {post.author || 'Khushi Tyagi'}
              </div>
              <div className="text-xs text-ink-faint flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Published {formattedDate}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Body Prose */}
          <div className="prose prose-stone max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-paper-border">
              <span className="text-xs font-semibold text-ink-faint uppercase tracking-wider block mb-3">
                Tags & Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-paper-muted text-ink border border-paper-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Claps / Likes Bar */}
          <div className="mt-10 p-5 rounded-2xl bg-paper-muted/60 border border-paper-border flex items-center justify-between">
            <div className="text-sm text-ink-muted">
              Did you find this article thoughtful?
            </div>
            <button
              onClick={handleLike}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-paper-card border border-paper-border hover:border-rose-300 text-sm font-medium text-ink hover:text-rose-600 transition-all shadow-paper-sm active:scale-95"
            >
              <Heart className={`w-4 h-4 ${likes > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likes} Claps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
