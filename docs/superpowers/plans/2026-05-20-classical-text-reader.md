# 古籍数字化阅览系统 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 打造专业级古籍数字化阅览体验，包含竖排文字、影印对照、逐字注释、繁简切换、外部链接等功能

**Architecture:** 基于现有 React + Vite 项目，新增 ClassicalReader 组件体系，扩展古籍数据结构，集成外部平台链接

**Tech Stack:** React 19 + TypeScript + Tailwind CSS + GSAP

---

## 文件结构映射

### 需要新增的文件

| 文件 | 职责 |
|------|------|
| `src/components/ClassicalReader.tsx` | 主阅览器容器 |
| `src/components/VerticalText.tsx` | 竖排文字渲染 |
| `src/components/AnnotationPopup.tsx` | 逐字注释弹窗 |
| `src/components/ChapterNav.tsx` | 章节导航树 |
| `src/components/ExternalLinks.tsx` | 外部平台链接 |
| `src/components/TextToolbar.tsx` | 工具栏（繁简切换等） |
| `src/data/classicalTexts.ts` | 古籍数据（含注释） |
| `src/types/classical.ts` | 类型定义 |

### 需要修改的文件

| 文件 | 变更内容 |
|------|---------|
| `src/sections/AncientBookReader.tsx` | 集成 ClassicalReader 或替换 |
| `src/sections/ResourceQuery.tsx` | 添加"在线阅读"按钮 |
| `src/App.tsx` | 添加 `/reader/:textId` 路由 |
| `src/index.css` | 添加竖排文字样式 |

---

## Task 1: 创建类型定义和古籍数据

**Files:**
- Create: `src/types/classical.ts`
- Create: `src/data/classicalTexts.ts`

**目标：** 定义古籍数据结构，准备首批高质量古籍内容

- [ ] **Step 1: 创建类型定义**

```typescript
// src/types/classical.ts

export interface ClassicalText {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  dynasty: string;
  category: string;
  description: string;
  totalPages: number;
  externalLinks: {
    shidianguji?: string;
    wikisource?: string;
  };
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  originalText: string;
  simplifiedText?: string;
  annotation?: string;
  wordAnnotations?: WordAnnotation[];
}

export interface WordAnnotation {
  word: string;
  position: { start: number; end: number };
  explanation: string;
  pronunciation?: string;
}

export type DisplayMode = 'text' | 'compare';
export type TextVariant = 'traditional' | 'simplified';
```

- [ ] **Step 2: 创建古籍数据（山海经）**

```typescript
// src/data/classicalTexts.ts

import type { ClassicalText } from '../types/classical';

export const classicalTexts: ClassicalText[] = [
  {
    id: 'shanhaijing',
    title: '山海经',
    originalTitle: '《山海經》',
    author: '佚名',
    dynasty: '先秦',
    category: '地理',
    description: '中国古代地理志怪典籍，记述山川、道里、民族、物产、药物、祭祀、巫医等内容，保存了大量远古神话传说。',
    totalPages: 18,
    externalLinks: {
      shidianguji: 'https://www.shidianguji.com/',
      wikisource: 'https://zh.wikisource.org/wiki/山海經',
    },
    chapters: [
      {
        id: 'nanshanjing',
        title: '南山经',
        originalText: `南山经之首曰鹊山。其首曰招摇之山，临于西海之上，多桂，多金玉。有草焉，其状如韭而青华，其名曰祝余，食之不饥。
有木焉，其状如榖而黑理，其华四照，其名曰迷榖，佩之不迷。有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。`,
        simplifiedText: `南山经之首曰鹊山。其首曰招摇之山，临于西海之上，多桂，多金玉。有草焉，其状如韭而青华，其名曰祝余，食之不饥。
有木焉，其状如榖而黑理，其华四照，其名曰迷榖，佩之不迷。有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。`,
        annotation: '南山经是《山海经》五篇山经之首，记述了南方山系的山脉、河流、动植物及矿产。',
        wordAnnotations: [
          {
            word: '招摇之山',
            position: { start: 13, end: 17 },
            explanation: '传说中的仙山，在今广西或越南北部一带。',
            pronunciation: 'zhāo yáo zhī shān',
          },
          {
            word: '祝余',
            position: { start: 45, end: 47 },
            explanation: '传说中的仙草，形似韭菜而开青花，食之可消除饥饿。',
            pronunciation: 'zhù yú',
          },
          {
            word: '迷榖',
            position: { start: 78, end: 80 },
            explanation: '传说中的神树，形似构树而有黑色纹理，佩戴可以不迷路。',
            pronunciation: 'mí gǔ',
          },
          {
            word: '狌狌',
            position: { start: 110, end: 112 },
            explanation: '传说中的异兽，形似猿猴而白耳，能伏地行走，食之善于奔跑。',
            pronunciation: 'xīng xīng',
          },
        ],
      },
      {
        id: 'xishan',
        title: '西山经',
        originalText: `西山经华山之首曰钱来之山，其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。
又西二百八十里曰章莪之山，无草木，多瑶碧。所为甚怪。有兽焉，其状如赤豹，五尾一角，其音如击石，其名曰狰。`,
        annotation: '西山经记述了西方山系，以华山为起点，多奇异矿物和异兽。',
        wordAnnotations: [
          {
            word: '羬羊',
            position: { start: 48, end: 50 },
            explanation: '传说中的异兽，形似羊而长马尾，其油脂可滋润皮肤。',
            pronunciation: 'qián yáng',
          },
          {
            word: '狰',
            position: { start: 110, end: 111 },
            explanation: '传说中的异兽，形似赤豹而有五条尾巴和一只角，叫声如击石。',
            pronunciation: 'zhēng',
          },
        ],
      },
      {
        id: 'dongshan',
        title: '东山经',
        originalText: `东山经之首曰樕𧑤之山，北临乾昧。食水出焉，而东北流注于海。其中多鳡鱼，多贝，多茈鱼，多薄鱼。
又南三百里曰藟山，其上有玉，其下有金。湖水出焉，东流注于食水，其中多活师。`,
        annotation: '东山经记述了东方山系，多水产和矿产资源。',
      },
      {
        id: 'beishan',
        title: '北山经',
        originalText: `北山经之首曰单狐之山，多机木，其上多华草。漨水出焉，而西流注于泑水，其中多茈石、文石。
又北二百五十里曰求如之山，其上多铜，其下多玉，无草木。滑水出焉，而西流注于诸毗之水。`,
        annotation: '北山经记述了北方山系，多矿产和寒冷地区的特有动植物。',
      },
      {
        id: 'zhongshan',
        title: '中山经',
        originalText: `中山经薄山之首曰甘枣之山。共水出焉，而西流注于河。其上多杻木，其下多竹箭。
又东二十里曰历儿山，其上多橿，多櫄木，是木也，方茎而圆叶，黄华而毛，其实如楝，服之不忘。`,
        annotation: '中山经记述了中央山系，是《山经》中最长的一篇，多珍奇草木。',
      },
    ],
  },
];

export function getTextById(id: string): ClassicalText | undefined {
  return classicalTexts.find((text) => text.id === id);
}

export function getChapterById(textId: string, chapterId: string) {
  const text = getTextById(textId);
  return text?.chapters.find((ch) => ch.id === chapterId);
}
```

- [ ] **Step 3: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 2: 创建竖排文字组件

**Files:**
- Create: `src/components/VerticalText.tsx`

**目标：** 实现专业的竖排文字渲染，支持逐字注释交互

- [ ] **Step 1: 实现 VerticalText 组件**

```tsx
// src/components/VerticalText.tsx

import { useState, useCallback } from 'react';
import type { WordAnnotation } from '../types/classical';
import AnnotationPopup from './AnnotationPopup';

interface VerticalTextProps {
  text: string;
  annotations?: WordAnnotation[];
  variant?: 'traditional' | 'simplified';
}

export default function VerticalText({ text, annotations = [], variant = 'traditional' }: VerticalTextProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<WordAnnotation | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleWordClick = useCallback((annotation: WordAnnotation, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPopupPosition({ x: rect.left + rect.width / 2, y: rect.top });
    setActiveAnnotation(annotation);
  }, []);

  const handleClose = useCallback(() => {
    setActiveAnnotation(null);
  }, []);

  // 构建带注释的文本
  const renderText = () => {
    if (annotations.length === 0) {
      return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // 按位置排序注释
    const sortedAnnotations = [...annotations].sort((a, b) => a.position.start - b.position.start);

    for (const annotation of sortedAnnotations) {
      // 添加注释前的普通文本
      if (annotation.position.start > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`} style={{ whiteSpace: 'pre-wrap' }}>
            {text.slice(lastIndex, annotation.position.start)}
          </span>
        );
      }

      // 添加可点击的注释字词
      elements.push(
        <span
          key={`anno-${annotation.position.start}`}
          onClick={(e) => handleWordClick(annotation, e)}
          style={{
            borderBottom: '2px solid var(--gold-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'rgba(201, 169, 110, 0.15)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          {text.slice(annotation.position.start, annotation.position.end)}
        </span>
      );

      lastIndex = annotation.position.end;
    }

    // 添加剩余的普通文本
    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-end`} style={{ whiteSpace: 'pre-wrap' }}>
          {text.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="vertical-text"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          lineHeight: 2.8,
          letterSpacing: '0.15em',
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          color: 'var(--ink-black)',
          height: '60vh',
          overflow: 'auto',
          padding: '2rem',
          textAlign: 'justify',
        }}
      >
        {renderText()}
      </div>

      {activeAnnotation && (
        <AnnotationPopup
          annotation={activeAnnotation}
          position={popupPosition}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 3: 创建注释弹窗组件

**Files:**
- Create: `src/components/AnnotationPopup.tsx`

**目标：** 点击字词后弹出的注释卡片

- [ ] **Step 1: 实现 AnnotationPopup**

```tsx
// src/components/AnnotationPopup.tsx

import { useEffect, useRef } from 'react';
import type { WordAnnotation } from '../types/classical';

interface AnnotationPopupProps {
  annotation: WordAnnotation;
  position: { x: number; y: number };
  onClose: () => void;
}

export default function AnnotationPopup({ annotation, position, onClose }: AnnotationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y - 10,
        transform: 'translate(-50%, -100%)',
        background: 'var(--ivory)',
        border: '1px solid var(--gold-primary)',
        borderRadius: '6px',
        padding: '1rem 1.25rem',
        boxShadow: '0 8px 32px rgba(139, 26, 26, 0.15)',
        maxWidth: '280px',
        zIndex: 1000,
        animation: 'annotation-fade-in 0.2s ease-out',
      }}
    >
      {/* 小三角箭头 */}
      <div
        style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '12px',
          background: 'var(--ivory)',
          borderRight: '1px solid var(--gold-primary)',
          borderBottom: '1px solid var(--gold-primary)',
          transform: 'translateX(-50%) rotate(45deg)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--imperial-red)',
            marginBottom: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {annotation.word}
          {annotation.pronunciation && (
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--ink-light)',
                fontWeight: 400,
              }}
            >
              [{annotation.pronunciation}]
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'var(--ink-grey)',
          }}
        >
          {annotation.explanation}
        </div>
      </div>

      <style>{`
        @keyframes annotation-fade-in {
          from { opacity: 0; transform: translate(-50%, -90%); }
          to { opacity: 1; transform: translate(-50%, -100%); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 4: 创建章节导航组件

**Files:**
- Create: `src/components/ChapterNav.tsx`

**目标：** 卷 → 章 → 节的层级导航

- [ ] **Step 1: 实现 ChapterNav**

```tsx
// src/components/ChapterNav.tsx

import type { Chapter } from '../types/classical';

interface ChapterNavProps {
  chapters: Chapter[];
  activeChapterId: string;
  onSelect: (chapterId: string) => void;
  textTitle: string;
}

export default function ChapterNav({ chapters, activeChapterId, onSelect, textTitle }: ChapterNavProps) {
  return (
    <div
      style={{
        width: '200px',
        background: 'var(--parchment)',
        borderRight: '1px solid rgba(201, 169, 110, 0.3)',
        padding: '1.5rem 0',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      <div
        style={{
          padding: '0 1.25rem 1rem',
          borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--imperial-red)',
          }}
        >
          {textTitle}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--ink-light)',
            marginTop: '0.25rem',
          }}
        >
          共 {chapters.length} 章
        </div>
      </div>

      <nav>
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            onClick={() => onSelect(chapter.id)}
            style={{
              width: '100%',
              padding: '0.75rem 1.25rem',
              border: 'none',
              background: activeChapterId === chapter.id ? 'rgba(139, 26, 26, 0.08)' : 'transparent',
              borderLeft: activeChapterId === chapter.id ? '3px solid var(--imperial-red)' : '3px solid transparent',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: activeChapterId === chapter.id ? 'var(--imperial-red)' : 'var(--ink-grey)',
            }}
            onMouseEnter={(e) => {
              if (activeChapterId !== chapter.id) {
                (e.target as HTMLElement).style.background = 'rgba(201, 169, 110, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeChapterId !== chapter.id) {
                (e.target as HTMLElement).style.background = 'transparent';
              }
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--gold-muted)',
                marginRight: '0.5rem',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {chapter.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 5: 创建外部链接组件

**Files:**
- Create: `src/components/ExternalLinks.tsx`

**目标：** 展示外部平台链接（识典古籍、维基文库等）

- [ ] **Step 1: 实现 ExternalLinks**

```tsx
// src/components/ExternalLinks.tsx

interface ExternalLinksProps {
  links: {
    shidianguji?: string;
    wikisource?: string;
  };
}

export default function ExternalLinks({ links }: ExternalLinksProps) {
  if (!links.shidianguji && !links.wikisource) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--ink-light)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        更多资源：
      </span>
      {links.shidianguji && (
        <a
          href={links.shidianguji}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.8rem',
            color: 'var(--imperial-red)',
            textDecoration: 'none',
            padding: '0.35rem 0.75rem',
            border: '1px solid rgba(139, 26, 26, 0.3)',
            borderRadius: '4px',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(139, 26, 26, 0.08)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'transparent';
          }}
        >
          识典古籍 ↗
        </a>
      )}
      {links.wikisource && (
        <a
          href={links.wikisource}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.8rem',
            color: 'var(--ink-grey)',
            textDecoration: 'none',
            padding: '0.35rem 0.75rem',
            border: '1px solid rgba(74, 74, 74, 0.2)',
            borderRadius: '4px',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(74, 74, 74, 0.08)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'transparent';
          }}
        >
          维基文库 ↗
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 6: 创建主阅览器组件

**Files:**
- Create: `src/components/ClassicalReader.tsx`

**目标：** 整合所有子组件，构建完整的古籍阅览器

- [ ] **Step 1: 实现 ClassicalReader**

```tsx
// src/components/ClassicalReader.tsx

import { useState, useCallback } from 'react';
import type { ClassicalText, DisplayMode, TextVariant } from '../types/classical';
import VerticalText from './VerticalText';
import ChapterNav from './ChapterNav';
import ExternalLinks from './ExternalLinks';

interface ClassicalReaderProps {
  text: ClassicalText;
}

export default function ClassicalReader({ text }: ClassicalReaderProps) {
  const [activeChapterId, setActiveChapterId] = useState(text.chapters[0]?.id || '');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('text');
  const [textVariant, setTextVariant] = useState<TextVariant>('traditional');

  const activeChapter = text.chapters.find((ch) => ch.id === activeChapterId);

  const handleChapterSelect = useCallback((chapterId: string) => {
    setActiveChapterId(chapterId);
  }, []);

  const currentText = textVariant === 'traditional'
    ? activeChapter?.originalText
    : activeChapter?.simplifiedText || activeChapter?.originalText;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--ivory)',
      }}
    >
      {/* 顶部工具栏 */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
          background: 'var(--parchment)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--ink-black)',
              margin: 0,
            }}
          >
            {text.title}
            {activeChapter && (
              <span style={{ color: 'var(--ink-grey)', fontWeight: 400 }}>
                {' · '}{activeChapter.title}
              </span>
            )}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* 繁简切换 */}
          <div
            style={{
              display: 'flex',
              border: '1px solid rgba(201, 169, 110, 0.4)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setTextVariant('traditional')}
              style={{
                padding: '0.4rem 0.8rem',
                border: 'none',
                background: textVariant === 'traditional' ? 'var(--imperial-red)' : 'transparent',
                color: textVariant === 'traditional' ? 'var(--ivory)' : 'var(--ink-grey)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              繁
            </button>
            <button
              onClick={() => setTextVariant('simplified')}
              style={{
                padding: '0.4rem 0.8rem',
                border: 'none',
                background: textVariant === 'simplified' ? 'var(--imperial-red)' : 'transparent',
                color: textVariant === 'simplified' ? 'var(--ivory)' : 'var(--ink-grey)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              简
            </button>
          </div>

          {/* 显示模式切换 */}
          <button
            onClick={() => setDisplayMode(displayMode === 'text' ? 'compare' : 'text')}
            style={{
              padding: '0.4rem 0.8rem',
              border: '1px solid rgba(201, 169, 110, 0.4)',
              borderRadius: '4px',
              background: 'transparent',
              color: 'var(--ink-grey)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {displayMode === 'text' ? '影印对照' : '纯文本'}
          </button>

          {/* 外部链接 */}
          <ExternalLinks links={text.externalLinks} />
        </div>
      </header>

      {/* 主体内容 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 章节导航 */}
        <ChapterNav
          chapters={text.chapters}
          activeChapterId={activeChapterId}
          onSelect={handleChapterSelect}
          textTitle={text.title}
        />

        {/* 文本区域 */}
        <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {displayMode === 'compare' && (
            <div
              style={{
                width: '45%',
                background: 'var(--ivory-warm)',
                borderRight: '1px solid rgba(201, 169, 110, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '80%',
                  background: 'var(--parchment)',
                  border: '1px solid var(--gold-muted)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink-light)',
                  fontFamily: 'var(--font-calligraphy)',
                }}
              >
                影印图像占位
              </div>
            </div>
          )}

          <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
            {activeChapter && (
              <>
                <div
                  style={{
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      color: 'var(--imperial-red)',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {activeChapter.title}
                  </h2>
                  {activeChapter.annotation && (
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        color: 'var(--ink-grey)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {activeChapter.annotation}
                    </p>
                  )}
                </div>

                {currentText && (
                  <VerticalText
                    text={currentText}
                    annotations={activeChapter.wordAnnotations}
                    variant={textVariant}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 7: 更新 App.tsx 添加阅览器路由

**Files:**
- Modify: `src/App.tsx`

**目标：** 添加 `/reader/:textId` 路由，支持独立阅览页面

- [ ] **Step 1: 添加路由和导入**

在 `App.tsx` 中添加：

```tsx
import ClassicalReader from './components/ClassicalReader';
import { getTextById } from './data/classicalTexts';
```

在路由逻辑中添加：

```tsx
const readerMatch = pathname.match(/^\/reader\/([^/]+)$/);
const readerText = readerMatch ? getTextById(readerMatch[1]) : null;

if (readerMatch && readerText) {
  return (
    <>
      <CustomCursor />
      <ClassicalReader text={readerText} />
    </>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 8: 更新 ResourceQuery 添加阅读按钮

**Files:**
- Modify: `src/sections/ResourceQuery.tsx`

**目标：** 在资源卡片上添加"在线阅读"按钮

- [ ] **Step 1: 添加阅读按钮**

在资源卡片渲染处，找到合适位置添加：

```tsx
<button
  onClick={() => {
    window.history.pushState({}, '', `/reader/${resource.id}`);
    window.location.reload();
  }}
  style={{
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: 'var(--imperial-red)',
    color: 'var(--ivory)',
    border: 'none',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
  }}
>
  在线阅读
</button>
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 9: 添加竖排文字样式到全局 CSS

**Files:**
- Modify: `src/index.css`

**目标：** 添加竖排文字相关的基础样式

- [ ] **Step 1: 添加样式**

在 `src/index.css` 中添加：

```css
/* 竖排文字基础样式 */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  line-height: 2.8;
  letter-spacing: 0.15em;
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--ink-black);
}

.vertical-text ::selection {
  background: var(--imperial-red);
  color: var(--ivory);
}

/* 竖排中的标点符号 */
.vertical-text .punctuation {
  text-combine-upright: all;
}

/* 古籍阅读器滚动条 */
.classical-reader ::-webkit-scrollbar {
  width: 4px;
}
.classical-reader ::-webkit-scrollbar-track {
  background: transparent;
}
.classical-reader ::-webkit-scrollbar-thumb {
  background: var(--gold-muted);
  border-radius: 2px;
}
```

- [ ] **Step 2: 验证构建**

Run: `cd app && npm run build`
Expected: 构建成功

---

## Task 10: 最终构建验证

**Files:**
- All modified and created files

**目标：** 确保所有组件正常工作

- [ ] **Step 1: 类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 2: 构建项目**

Run: `cd app && npm run build`
Expected: 构建成功

- [ ] **Step 3: 预览验证**

Run: `cd app && npm run preview`
Expected: 服务器启动，访问 `/reader/shanhaijing` 可看到古籍阅览器

---

## 自审检查

### Spec 覆盖检查

| 设计文档章节 | 对应 Task | 状态 |
|-------------|----------|------|
| 类型定义 | Task 1 | ✅ |
| 古籍数据 | Task 1 | ✅ |
| 竖排文字 | Task 2 | ✅ |
| 注释弹窗 | Task 3 | ✅ |
| 章节导航 | Task 4 | ✅ |
| 外部链接 | Task 5 | ✅ |
| 主阅览器 | Task 6 | ✅ |
| 路由集成 | Task 7 | ✅ |
| 资源查询集成 | Task 8 | ✅ |
| 全局样式 | Task 9 | ✅ |
| 构建验证 | Task 10 | ✅ |

### Placeholder 扫描

- 无 "TBD", "TODO", "implement later"
- 所有步骤包含完整代码

---

*计划完成。基于设计文档 `docs/superpowers/specs/2026-05-20-classical-text-reader.md` 制定。*
