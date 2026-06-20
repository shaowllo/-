import { useEffect, useRef } from 'react';
import type { WordAnnotation } from '../types/classical';
import { X, Volume2 } from 'lucide-react';

interface AnnotationPopupProps {
  annotation: WordAnnotation | null;
  onClose: () => void;
}

export default function AnnotationPopup({ annotation, onClose }: AnnotationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (annotation) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [annotation, onClose]);

  if (!annotation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="relative w-full max-w-md mx-4 p-6 rounded-lg shadow-2xl"
        style={{
          backgroundColor: 'var(--color-ivory)',
          border: '2px solid var(--color-gold)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full transition-colors hover:bg-black/10"
          aria-label="关闭"
        >
          <X className="w-5 h-5" style={{ color: 'var(--color-ink)' }} />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: '"Noto Serif SC", serif',
                color: 'var(--color-royal-red)',
              }}
            >
              {annotation.word}
            </h3>
            <span
              className="flex items-center gap-1 px-2 py-1 rounded-full text-sm"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-ivory)',
              }}
            >
              <Volume2 className="w-3 h-3" />
              {annotation.pinyin}
            </span>
          </div>

          <div
            className="h-px w-full"
            style={{ backgroundColor: 'var(--color-gold)', opacity: 0.4 }}
          />

          <div>
            <h4
              className="text-sm font-semibold mb-2 uppercase tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              释义
            </h4>
            <p
              className="text-base leading-relaxed"
              style={{
                color: 'var(--color-ink)',
                fontFamily: '"Noto Serif SC", serif',
              }}
            >
              {annotation.explanation}
            </p>
          </div>

          <div
            className="mt-4 p-3 rounded text-sm"
            style={{
              backgroundColor: 'rgba(139, 0, 0, 0.05)',
              borderLeft: '3px solid var(--color-royal-red)',
            }}
          >
            <span style={{ color: 'var(--color-royal-red)', fontWeight: 600 }}>
              提示：
            </span>
            <span style={{ color: 'var(--color-ink)' }}>
              点击文中其他标注词汇可查看详细释义
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
