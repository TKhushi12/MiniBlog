import React from 'react';
import { BookOpen, RefreshCw, AlertCircle, FileSearch } from 'lucide-react';

export function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-paper-card border border-paper-border rounded-2xl p-6 sm:p-7 shadow-paper-sm animate-pulse space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-paper-muted rounded-full"></div>
            <div className="h-4 w-16 bg-paper-muted rounded"></div>
          </div>
          <div className="h-7 w-3/4 bg-paper-muted rounded-md"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-paper-muted rounded"></div>
            <div className="h-4 w-5/6 bg-paper-muted rounded"></div>
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-5 w-14 bg-paper-muted rounded-md"></div>
            <div className="h-5 w-16 bg-paper-muted rounded-md"></div>
          </div>
          <div className="pt-4 border-t border-paper-border flex justify-between items-center">
            <div className="h-6 w-20 bg-paper-muted rounded-full"></div>
            <div className="h-6 w-12 bg-paper-muted rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ searchTerm, category, onReset }) {
  return (
    <div className="text-center py-16 px-4 bg-paper-card border border-dashed border-paper-border rounded-3xl max-w-xl mx-auto my-8">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-paper-muted flex items-center justify-center text-ink-muted mb-4">
        <FileSearch className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-xl font-bold text-ink mb-1.5">
        No stories found
      </h3>
      <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto mb-6 leading-relaxed">
        {searchTerm
          ? `We couldn't find any articles matching "${searchTerm}". Try checking your spelling or search for another topic.`
          : `There are currently no articles in the "${category}" category.`}
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink text-paper text-xs sm:text-sm font-medium hover:bg-ink-dark shadow-paper-sm transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset filters & search</span>
      </button>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between gap-4 max-w-2xl mx-auto my-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-xs sm:text-sm">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
        <span>{message || 'Unable to connect to the backend server.'}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition-colors shrink-0"
        >
          Retry
        </button>
      )}
    </div>
  );
}
