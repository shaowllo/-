import { useMemo, useCallback } from 'react';
import type { WordAnnotation, TextVariant } from '../types/classical';

interface VerticalTextProps {
  content: string;
  annotations: WordAnnotation[];
  variant?: TextVariant;
  onAnnotationClick?: (annotation: WordAnnotation) => void;
  className?: string;
}

export default function VerticalText({
  content,
  annotations,
  onAnnotationClick,
  className = '',
}: VerticalTextProps) {
  const annotatedSegments = useMemo(() => {
    const segments: {
      type: 'text' | 'annotation';
      content: string;
      annotation?: WordAnnotation;
    }[] = [];

    let lastIndex = 0;
    const sortedAnnotations = [...annotations].sort((a, b) => a.position - b.position);

    for (const annotation of sortedAnnotations) {
      if (annotation.position > lastIndex) {
        segments.push({
          type: 'text',
          content: content.slice(lastIndex, annotation.position),
        });
      }

      segments.push({
        type: 'annotation',
        content: annotation.word,
        annotation,
      });

      lastIndex = annotation.position + annotation.word.length;
    }

    if (lastIndex < content.length) {
      segments.push({
        type: 'text',
        content: content.slice(lastIndex),
      });
    }

    return segments;
  }, [content, annotations]);

  const handleAnnotationClick = useCallback(
    (annotation: WordAnnotation) => {
      onAnnotationClick?.(annotation);
    },
    [onAnnotationClick]
  );

  return (
    <div
      className={`vertical-text-container ${className}`}
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        lineHeight: 2.2,
        letterSpacing: '0.15em',
        fontFamily: '"Noto Serif SC", "Source Han Serif SC", "SimSun", serif',
      }}
    >
      {annotatedSegments.map((segment, index) => {
        if (segment.type === 'annotation' && segment.annotation) {
          return (
            <span
              key={`ann-${index}`}
              className="annotation-word cursor-pointer border-b-2 border-dashed transition-colors duration-200 hover:text-[#c9a050]"
              style={{
                borderColor: 'var(--color-gold)',
                color: 'var(--color-royal-red)',
                fontWeight: 600,
              }}
              onClick={() => handleAnnotationClick(segment.annotation!)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAnnotationClick(segment.annotation!);
                }
              }}
            >
              {segment.content}
            </span>
          );
        }

        return (
          <span key={`text-${index}`} className="text-content">
            {segment.content}
          </span>
        );
      })}
    </div>
  );
}
