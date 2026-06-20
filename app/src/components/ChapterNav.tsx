import type { Chapter } from '../types/classical';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface ChapterNavProps {
  chapters: Chapter[];
  currentChapterId: string;
  onChapterChange: (chapterId: string) => void;
  variant?: 'simplified' | 'traditional';
}

export default function ChapterNav({
  chapters,
  currentChapterId,
  onChapterChange,
  variant = 'simplified',
}: ChapterNavProps) {
  const currentIndex = chapters.findIndex((ch) => ch.id === currentChapterId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < chapters.length - 1;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-lg"
      style={{
        backgroundColor: 'rgba(139, 0, 0, 0.08)',
        border: '1px solid rgba(201, 160, 80, 0.3)',
      }}
    >
      <button
        onClick={() => hasPrev && onChapterChange(chapters[currentIndex - 1].id)}
        disabled={!hasPrev}
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(139,0,0,0.1)]"
        style={{ color: 'var(--color-royal-red)' }}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">上一章</span>
      </button>

      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4" style={{ color: 'var(--color-gold)' }} />
        <span
          className="text-sm font-semibold"
          style={{ color: 'var(--color-ink)' }}
        >
          {variant === 'traditional'
            ? chapters[currentIndex]?.traditionalTitle
            : chapters[currentIndex]?.title}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-ivory)',
          }}
        >
          {currentIndex + 1} / {chapters.length}
        </span>
      </div>

      <button
        onClick={() => hasNext && onChapterChange(chapters[currentIndex + 1].id)}
        disabled={!hasNext}
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(139,0,0,0.1)]"
        style={{ color: 'var(--color-royal-red)' }}
      >
        <span className="text-sm font-medium">下一章</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
