import React, { useState } from 'react';
import { Heart, Clock, Calendar, Edit3, Trash2, ArrowUpRight } from 'lucide-react';

const CATEGORY_STYLES = {
  'Software Architecture': 'bg-stone-100 text-stone-800 border-stone-200',
  'React & Node': 'bg-amber-50 text-amber-900 border-amber-200',
  'Web Development': 'bg-sky-50 text-sky-900 border-sky-200',
  'Design & UI': 'bg-emerald-50 text-emerald-900 border-emerald-200',
  'Career & Growth': 'bg-purple-50 text-purple-900 border-purple-200',
  'Personal Journal': 'bg-rose-50 text-rose-900 border-rose-200',
};

export default function PostCard({
  post,
  onReadPost,
  onEditPost,
  onDeletePost,
  onLikePost,
}) {
  const [isLiking, setIsLiking] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const categoryBadgeClass =
    CATEGORY_STYLES[post.category] || 'bg-paper-muted text-ink-muted border-paper-border';

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);
    setLikesCount((prev) => prev + 1);

    try {
      if (onLikePost) {
        await onLikePost(post._id);
      }
    } catch (err) {
      setLikesCount((prev) => Math.max(0, prev - 1));
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <article
      onClick={() => onReadPost(post)}
      className="group bg-paper-card border border-paper-border hover:border-ink/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-paper-sm hover:shadow-paper-md transition-all duration-200 cursor-pointer relative"
    >
      <div>
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryBadgeClass}`}
          >
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-ink-faint">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime || '3 min read'}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink group-hover:text-terracotta-600 transition-colors tracking-tight leading-snug mb-3">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 mb-5 font-normal">
          {post.excerpt || post.content.substring(0, 180) + '...'}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-paper-muted text-ink-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="pt-4 border-t border-paper-border flex items-center justify-between gap-4">
        {/* Author Info */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-paper-muted border border-paper-border flex items-center justify-center font-serif text-xs font-bold text-ink">
            {post.author ? post.author.split(' ').map((n) => n[0]).join('') : 'KT'}
          </div>
          <span className="text-xs font-medium text-ink-muted">
            {post.author || 'Khushi Tyagi'}
          </span>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-1">
          {/* Like Button */}
          <button
            onClick={handleLikeClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-ink-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Applaud story"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                likesCount > 0 ? 'fill-rose-500 text-rose-500' : ''
              } transition-transform active:scale-125`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Edit Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditPost(post);
            }}
            className="p-1.5 rounded-lg text-ink-faint hover:text-ink hover:bg-paper-muted transition-colors"
            title="Edit story"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Delete Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeletePost(post);
            }}
            className="p-1.5 rounded-lg text-ink-faint hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete story"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
