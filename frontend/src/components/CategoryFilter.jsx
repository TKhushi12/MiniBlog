import React from 'react';
import { Layers } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Software Architecture',
  'React & Node',
  'Web Development',
  'Design & UI',
  'Career & Growth',
  'Personal Journal',
];

export default function CategoryFilter({ selectedCategory, onSelectCategory, categoryCounts = {} }) {
  return (
    <div className="border-b border-paper-border py-4 mb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' ? categoryCounts.total : categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-ink text-paper shadow-paper-sm font-semibold'
                    : 'bg-paper-card text-ink-muted border border-paper-border hover:border-ink/30 hover:text-ink'
                }`}
              >
                <span>{cat}</span>
                {count !== undefined && count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                      isSelected ? 'bg-paper/20 text-paper' : 'bg-paper-muted text-ink-muted'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
