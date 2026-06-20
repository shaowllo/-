import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Type, BookOpen, ScrollText } from 'lucide-react';
import { getTextById } from '../data/classicalTexts';
import type { WordAnnotation, TextVariant, DisplayMode } from '../types/classical';
import VerticalText from './VerticalText';
import AnnotationPopup from './AnnotationPopup';
import ChapterNav from './ChapterNav';
import ExternalLinks from './ExternalLinks';

function getTextIdFromPath(): string {
  const match = window.location.pathname.match(/^\/reader\/([^/]+)$/);
  return match?.[1] || '';
}

export default function ClassicalReader() {
  const [textId] = useState(() => getTextIdFromPath());
  const text = getTextById(textId);

  const [currentChapterId, setCurrentChapterId] = useState(
    text?.chapters[0]?.id || ''
  );
  const [textVariant, setTextVariant] = useState<TextVariant>('simplified');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('vertical');
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<WordAnnotation | null>(null);

  useEffect(() => {
    if (text && !currentChapterId) {
      setCurrentChapterId(text.chapters[0]?.id || '');
    }
  }, [text, currentChapterId]);

  const currentChapter = text?.chapters.find((ch) => ch.id === currentChapterId);

  const handleAnnotationClick = useCallback((annotation: WordAnnotation) => {
    setSelectedAnnotation(annotation);
  }, []);

  const handleCloseAnnotation = useCallback(() => {
    setSelectedAnnotation(null);
  }, []);

  const handleChapterChange = useCallback((chapterId: string) => {
    setCurrentChapterId(chapterId);
    setSelectedAnnotation(null);
  }, []);

  const navigateHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  if (!text) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--color-royal-red)' }}
          >
            未找到该古籍
          </h2>
          <button
            onClick={navigateHome}
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--color-royal-red)',
              color: 'var(--color-ivory)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const content =
    textVariant === 'traditional'
      ? currentChapter?.traditionalContent || ''
      : currentChapter?.content || '';

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-ivory)' }}
    >
      <AnnotationPopup
        annotation={selectedAnnotation}
        onClose={handleCloseAnnotation}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: 'rgba(252, 248, 240, 0.95)',
          backdropFilter: 'blur(8px)',
          borderColor: 'rgba(201, 160, 80, 0.3)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={navigateHome}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-[rgba(139,0,0,0.1)]"
              style={{ color: 'var(--color-royal-red)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回</span>
            </button>

            <div className="h-6 w-px bg-[rgba(201,160,80,0.3)]" />

            <div>
              <h1
                className="text-lg font-bold leading-tight"
                style={{
                  color: 'var(--color-royal-red)',
                  fontFamily: '"Noto Serif SC", serif',
                }}
              >
                {textVariant === 'traditional'
                  ? text.traditionalTitle
                  : text.title}
              </h1>
              <p
                className="text-xs"
                style={{ color: 'var(--color-ink)', opacity: 0.6 }}
              >
                {text.dynasty} · {text.author}
              </p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setTextVariant((v) =>
                  v === 'simplified' ? 'traditional' : 'simplified'
                )
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: 'rgba(139, 0, 0, 0.08)',
                color: 'var(--color-royal-red)',
              }}
              title={textVariant === 'simplified' ? '切换繁体' : '切换简体'}
            >
              <Type className="w-4 h-4" />
              {textVariant === 'simplified' ? '繁' : '简'}
            </button>

            <button
              onClick={() =>
                setDisplayMode((m) => (m === 'vertical' ? 'horizontal' : 'vertical'))
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: 'rgba(139, 0, 0, 0.08)',
                color: 'var(--color-royal-red)',
              }}
              title={displayMode === 'vertical' ? '切换横排' : '切换竖排'}
            >
              {displayMode === 'vertical' ? (
                <>
                  <ScrollText className="w-4 h-4" />
                  <span>竖排</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>横排</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Text Area */}
          <div className="lg:col-span-3 space-y-4">
            <ChapterNav
              chapters={text.chapters}
              currentChapterId={currentChapterId}
              onChapterChange={handleChapterChange}
              variant={textVariant}
            />

            <div
              className="rounded-lg p-6 min-h-[60vh]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(201, 160, 80, 0.2)',
              }}
            >
              {displayMode === 'vertical' ? (
                <div className="h-[60vh]">
                  <VerticalText
                    content={content}
                    annotations={currentChapter?.annotations || []}
                    variant={textVariant}
                    onAnnotationClick={handleAnnotationClick}
                  />
                </div>
              ) : (
                <div
                  className="prose max-w-none"
                  style={{
                    fontFamily: '"Noto Serif SC", serif',
                    lineHeight: 2.2,
                    letterSpacing: '0.05em',
                  }}
                >
                  {content.split('\n\n').map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="mb-6 text-justify indent-8"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <ChapterNav
              chapters={text.chapters}
              currentChapterId={currentChapterId}
              onChapterChange={handleChapterChange}
              variant={textVariant}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Info */}
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'rgba(139, 0, 0, 0.04)',
                border: '1px solid rgba(201, 160, 80, 0.2)',
              }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{
                  color: 'var(--color-royal-red)',
                  fontFamily: '"Noto Serif SC", serif',
                }}
              >
                书籍信息
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-ink)', opacity: 0.8 }}
              >
                {text.description}
              </p>
            </div>

            {/* External Links */}
            <ExternalLinks links={text.externalLinks} />
          </div>
        </div>
      </main>
    </div>
  );
}
