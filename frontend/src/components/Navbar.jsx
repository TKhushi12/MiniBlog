import React from 'react';
import { PenTool, Search, X, BookOpen } from 'lucide-react';

export default function Navbar({
  searchTerm,
  onSearchChange,
  onOpenCreateModal,
  totalPosts = 0,
}) {
  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur-md border-b border-paper-border transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ink text-paper flex items-center justify-center font-serif text-lg font-bold shadow-paper-sm">
              KT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  Khushi's Journal
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-terracotta-100 text-terracotta-700 border border-terracotta-100">
                  Engineering & Essays
                </span>
              </div>
              <p className="text-xs text-ink-muted hidden sm:block">
                Full-stack web architecture, frontend craftsmanship, and career notes.
              </p>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-36 sm:w-64 lg:w-72">
              <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-paper-card border border-paper-border rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all shadow-paper-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* New Post Button */}
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-ink hover:bg-ink-dark text-paper text-xs sm:text-sm font-medium shadow-paper-sm hover:shadow-paper-md transition-all active:scale-[0.98]"
            >
              <PenTool className="w-4 h-4 text-terracotta-500" />
              <span className="hidden sm:inline">Write Story</span>
              <span className="sm:hidden">Write</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
