import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  postTitle = '',
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm flex justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-paper-card w-full max-w-md rounded-3xl border border-paper-border shadow-paper-lg p-6 sm:p-7 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-ink mb-1">
              Delete this story?
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              This action cannot be undone. Are you sure you want to remove{' '}
              <strong className="text-ink font-semibold">"{postTitle}"</strong> from your journal?
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-paper-border flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-ink-muted hover:text-ink hover:bg-paper-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-medium shadow-sm transition-all disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete Story'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
