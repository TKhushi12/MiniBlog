import React, { useState, useEffect } from 'react';
import { X, PenTool, CheckCircle, Clock, Hash, Tag, User } from 'lucide-react';

const CATEGORIES = [
  'Web Development',
  'React & Node',
  'Software Architecture',
  'Career & Growth',
  'Personal Journal',
  'Design & UI',
];

const COLORS = [
  { id: 'stone', name: 'Warm Stone', class: 'bg-stone-500' },
  { id: 'amber', name: 'Terracotta', class: 'bg-amber-600' },
  { id: 'emerald', name: 'Sage Green', class: 'bg-emerald-600' },
  { id: 'slate', name: 'Editorial Slate', class: 'bg-slate-600' },
  { id: 'indigo', name: 'Deep Indigo', class: 'bg-indigo-600' },
  { id: 'rose', name: 'Muted Rose', class: 'bg-rose-500' },
];

export default function PostFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('Khushi Tyagi');
  const [coverColor, setCoverColor] = useState('stone');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setCategory(initialData.category || 'Web Development');
      setTags(Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '');
      setAuthor(initialData.author || 'Khushi Tyagi');
      setCoverColor(initialData.coverColor || 'stone');
    } else {
      setTitle('');
      setContent('');
      setCategory('Web Development');
      setTags('');
      setAuthor('Khushi Tyagi');
      setCoverColor('stone');
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Calculate live word count & reading time
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!content.trim()) errs.content = 'Story content cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const postPayload = {
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean),
      author: author.trim() || 'Khushi Tyagi',
      coverColor,
    };

    onSubmit(postPayload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-paper-card w-full max-w-2xl rounded-3xl border border-paper-border shadow-paper-lg overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-paper-border flex items-center justify-between bg-paper-card">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-ink">
                {initialData ? 'Edit Story' : 'Draft New Story'}
              </h2>
              <p className="text-xs text-ink-muted">
                {initialData
                  ? 'Update your publication and content.'
                  : 'Publish your thoughts to the journal.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-ink-faint hover:text-ink hover:bg-paper-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Architecting Scalable MERN Systems in 2026"
              className={`w-full bg-paper border ${
                errors.title ? 'border-rose-400 focus:ring-rose-200' : 'border-paper-border focus:ring-terracotta-500/20 focus:border-terracotta-500'
              } rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Category & Author Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-paper border border-paper-border rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className="w-full bg-paper border border-paper-border rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" /> Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. React, JavaScript, Architecture, Performance"
              className="w-full bg-paper border border-paper-border rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all font-mono text-xs"
            />
          </div>

          {/* Story Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Story Content <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-ink-faint flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {wordCount} words • ~{estimatedReadTime} min read
              </span>
            </div>
            <textarea
              rows={9}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article here... You can use ### for subheadings and - for bullet points."
              className={`w-full bg-paper border ${
                errors.content ? 'border-rose-400 focus:ring-rose-200' : 'border-paper-border focus:ring-terracotta-500/20 focus:border-terracotta-500'
              } rounded-2xl p-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 transition-all leading-relaxed font-sans`}
            ></textarea>
            {errors.content && <p className="text-xs text-rose-500 mt-1">{errors.content}</p>}
          </div>

          {/* Color Palette Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Accent Theme
            </label>
            <div className="flex items-center gap-2">
              {COLORS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setCoverColor(col.id)}
                  className={`w-7 h-7 rounded-full ${col.class} transition-all ${
                    coverColor === col.id ? 'ring-2 ring-offset-2 ring-ink scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-paper-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-ink-muted hover:text-ink hover:bg-paper-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink hover:bg-ink-dark text-paper text-xs sm:text-sm font-medium shadow-paper-sm hover:shadow-paper-md transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4 text-terracotta-500" />
              <span>{isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Publish Story'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
