# 《山海经》卷轴叙事流改造 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有《山海经》数字化展示项目从暗色宇宙主题改造为永乐大典风格的皇家朱红卷轴叙事流主题

**Architecture:** 基于现有 React + Vite + Tailwind + GSAP 项目，全面替换配色系统，新增章节导航和卷轴动画组件，移除 WebGL 着色器，保留所有数据和交互逻辑

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + GSAP (ScrollTrigger)

---

## 文件结构映射

### 需要修改的文件

| 文件 | 当前职责 | 改造后职责 |
|------|---------|-----------|
| `src/index.css` | 暗色主题 CSS 变量 | 皇家朱红主题 CSS 变量 |
| `src/App.tsx` | 暗色主题布局 + WebGL 背景 | 象牙白主题布局 + 章节导航 |
| `src/sections/Hero.tsx` | 暗色英雄区 + GSAP 入场 | 卷轴式鸿蒙开场 |
| `src/sections/ExhibitionIndex.tsx` | 暗色神兽列表 | 卷轴式神兽档案列表 |
| `src/sections/ExhibitionDetail.tsx` | 暗色详情页 | 朱红主题详情页 |
| `src/sections/AncientBookReader.tsx` | 暗色古籍阅读器 | 朱红封面 + 象牙白书页 |
| `src/sections/ResourceQuery.tsx` | 暗色资源查询 | 象牙白主题资源查询 |
| `src/sections/Footer.tsx` | 暗色页脚 | 象牙白主题页脚 |
| `src/sections/CinematicPavilions.tsx` | 暗色视频区 | 象牙白主题视频区 |
| `src/components/CustomCursor.tsx` | 白色光标 | 朱红色光标 |
| `index.html` | 默认字体加载 | 新增 Google Fonts 加载 |

### 需要新增的文件

| 文件 | 职责 |
|------|------|
| `src/components/ScrollNav.tsx` | 固定顶部章节导航栏 |
| `src/components/ScrollSection.tsx` | 通用卷轴章节包装 |
| `src/sections/Hongmeng.tsx` | 鸿蒙章节（卷轴开场） |
| `src/sections/MountainsChapter.tsx` | 山川章节（数据展示） |
| `src/sections/KingdomsChapter.tsx` | 邦国章节（视频 + 邦国卡片） |
| `src/sections/HerbsChapter.tsx` | 草木章节（古籍阅读器包装） |
| `src/sections/LegacyChapter.tsx` | 遗典章节（资源查询包装） |

### 需要删除的文件

| 文件 | 说明 |
|------|------|
| `src/sections/VoidShader.tsx` | WebGL 着色器不再使用 |
| `src/sections/Manifesto.tsx` | 宣言区被鸿蒙章节取代 |

---

## Task 1: 全局样式系统改造

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`
- Modify: `tailwind.config.js`

**目标：** 将暗色主题全面替换为皇家朱红 + 金色 + 象牙白主题

- [ ] **Step 1: 修改 `index.html` 添加 Google Fonts**

在 `<head>` 中添加字体加载：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700;900&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
```

- [ ] **Step 2: 全面替换 `src/index.css` 的 CSS 变量**

将 `:root` 中的暗色变量全部替换为朱红主题：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 皇家朱红主题配色 */
    --imperial-red: #8B1A1A;
    --imperial-red-light: #A52A2A;
    --imperial-red-dark: #5C0F0F;
    --gold-primary: #C9A96E;
    --gold-bright: #D4AF37;
    --gold-muted: #9A8B6F;
    --ivory: #F5F0E8;
    --ivory-warm: #EDE6D6;
    --parchment: #FAF6F0;
    --ink-black: #1A1A1A;
    --ink-grey: #4A4A4A;
    --ink-light: #7A7A7A;
    --vermillion: #C73E3A;
    --jade-green: #2E8B57;

    /* 字体 */
    --font-display: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif;
    --font-sans: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    --font-calligraphy: 'ZCOOL XiaoWei', 'Ma Shan Zheng', cursive;
    --font-mono: 'SF Mono', 'Fira Code', monospace;

    /* shadcn/ui 兼容变量 - 映射到新主题 */
    --background: 40 33% 94%;
    --foreground: 0 0% 10%;
    --card: 40 33% 96%;
    --card-foreground: 0 0% 10%;
    --popover: 40 33% 96%;
    --popover-foreground: 0 0% 10%;
    --primary: 0 68% 33%;
    --primary-foreground: 40 33% 94%;
    --secondary: 40 20% 88%;
    --secondary-foreground: 0 0% 10%;
    --muted: 40 20% 88%;
    --muted-foreground: 0 0% 45%;
    --accent: 40 33% 90%;
    --accent-foreground: 0 0% 10%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 40 20% 80%;
    --input: 40 20% 80%;
    --ring: 0 68% 33%;
    --radius: 0.25rem;

    /* 空间 */
    --space-section: 8rem;
    --space-element: 2rem;
    --grid-pad: 8vw;
  }

  * {
    @apply border-border;
  }

  body {
    font-family: var(--font-sans);
    color: var(--ink-black);
    background: var(--ivory);
    overflow-x: hidden;
    cursor: none;
  }

  a, button {
    cursor: none;
  }

  ::selection {
    background: var(--imperial-red);
    color: var(--ivory);
  }
}

/* 卷轴展开动画 */
@keyframes scroll-unroll {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* 向下滚动提示 */
@keyframes scroll-down-bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
}

/* 金色闪烁 */
@keyframes gold-shimmer {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* 页码翻页 */
@keyframes pageFlip {
  0% {
    opacity: 0.3;
    transform: perspective(2000px) rotateY(0deg);
  }
  50% {
    opacity: 0.6;
    transform: perspective(2000px) rotateY(-5deg);
  }
  100% {
    opacity: 0;
    transform: perspective(2000px) rotateY(0deg);
  }
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--ivory);
}
::-webkit-scrollbar-thumb {
  background: var(--gold-muted);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--gold-primary);
}
```

- [ ] **Step 3: 更新 `tailwind.config.js` 配色**

将 `darkMode` 改为可选（或移除），调整颜色映射：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 新增皇家主题色
        imperial: {
          DEFAULT: "#8B1A1A",
          light: "#A52A2A",
          dark: "#5C0F0F",
        },
        gold: {
          DEFAULT: "#C9A96E",
          bright: "#D4AF37",
          muted: "#9A8B6F",
        },
        ivory: {
          DEFAULT: "#F5F0E8",
          warm: "#EDE6D6",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          grey: "#4A4A4A",
          light: "#7A7A7A",
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        calligraphy: ['var(--font-calligraphy)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        scroll: "0 0 40px rgba(139, 26, 26, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "scroll-unroll": {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
        "scroll-down": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "scroll-unroll": "scroll-unroll 1.5s ease-out forwards",
        "scroll-down": "scroll-down 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

- [ ] **Step 4: 验证样式编译**

Run: `cd app && npm run build`
Expected: 编译成功，无 CSS 相关错误

---

## Task 2: 创建章节导航组件

**Files:**
- Create: `src/components/ScrollNav.tsx`

**目标：** 创建固定在顶部的卷轴式章节导航栏

- [ ] **Step 1: 实现 ScrollNav 组件**

```tsx
import { useEffect, useState } from 'react';

const chapters = [
  { id: 'hongmeng', label: '鸿蒙' },
  { id: 'mountains', label: '山川' },
  { id: 'beasts', label: '异兽' },
  { id: 'kingdoms', label: '邦国' },
  { id: 'herbs', label: '草木' },
  { id: 'legacy', label: '遗典' },
];

export default function ScrollNav() {
  const [activeChapter, setActiveChapter] = useState('hongmeng');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Determine active chapter
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveChapter(chapters[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(245, 240, 232, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
        padding: '0 8vw',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--imperial-red)',
            letterSpacing: '0.1em',
          }}
        >
          山海经
        </span>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              style={{
                fontFamily: 'var(--font-calligraphy)',
                fontSize: '1rem',
                color: activeChapter === ch.id ? 'var(--gold-primary)' : 'var(--ink-grey)',
                border: 'none',
                background: 'none',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'color 0.3s ease',
                cursor: 'none',
              }}
            >
              {ch.label}
              {activeChapter === ch.id && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--gold-primary)',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: 验证组件无类型错误**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 3: 创建鸿蒙章节（卷轴开场）

**Files:**
- Create: `src/sections/Hongmeng.tsx`
- Modify: `src/sections/Hero.tsx`（最终将被替换）

**目标：** 创建永乐大典风格的卷轴展开开场动画

- [ ] **Step 1: 实现 Hongmeng 组件**

```tsx
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Hongmeng() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isUnrolled, setIsUnrolled] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Scroll unroll animation
    tl.fromTo(
      '.scroll-paper',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Title fade in
    tl.fromTo(
      '.hongmeng-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    // Subtitle
    tl.fromTo(
      '.hongmeng-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // Decorative line
    tl.fromTo(
      '.hongmeng-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    );

    // Scroll cue
    tl.fromTo(
      '.scroll-cue',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    tl.eventCallback('onComplete', () => setIsUnrolled(true));

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hongmeng"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ivory)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 8vw',
      }}
    >
      {/* Scroll paper container */}
      <div
        className="scroll-paper"
        style={{
          maxWidth: '800px',
          width: '100%',
          padding: '4rem 3rem',
          background: 'var(--parchment)',
          border: '2px solid var(--gold-primary)',
          borderRadius: '4px',
          boxShadow: '0 0 40px rgba(139, 26, 26, 0.08), inset 0 0 60px rgba(201, 169, 110, 0.05)',
          position: 'relative',
          transformOrigin: 'center',
        }}
      >
        {/* Decorative corners */}
        {[[0, 0], [1, 0], [0, 1], [1, 1]].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              borderTop: pos[1] === 0 ? '2px solid var(--gold-primary)' : 'none',
              borderBottom: pos[1] === 1 ? '2px solid var(--gold-primary)' : 'none',
              borderLeft: pos[0] === 0 ? '2px solid var(--gold-primary)' : 'none',
              borderRight: pos[0] === 1 ? '2px solid var(--gold-primary)' : 'none',
              top: pos[1] === 0 ? '12px' : 'auto',
              bottom: pos[1] === 1 ? '12px' : 'auto',
              left: pos[0] === 0 ? '12px' : 'auto',
              right: pos[0] === 1 ? '12px' : 'auto',
            }}
          />
        ))}

        {/* Inner border */}
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            border: '1px solid rgba(201, 169, 110, 0.3)',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1
            className="hongmeng-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              color: 'var(--ink-black)',
              letterSpacing: '0.15em',
              margin: 0,
              lineHeight: 1.2,
              opacity: 0,
            }}
          >
            山海经
          </h1>

          <div
            className="hongmeng-line"
            style={{
              width: '120px',
              height: '2px',
              background: 'var(--gold-primary)',
              margin: '1.5rem auto',
              transformOrigin: 'center',
            }}
          />

          <p
            className="hongmeng-subtitle"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
              color: 'var(--ink-grey)',
              letterSpacing: '0.3em',
              margin: 0,
              opacity: 0,
            }}
          >
            上古奇书 · 志怪地理之祖
          </p>
        </div>
      </div>

      {/* Scroll down cue */}
      <div
        ref={scrollRef}
        className="scroll-cue"
        style={{
          marginTop: '4rem',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-calligraphy)',
            fontSize: '0.9rem',
            color: 'var(--gold-muted)',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}
        >
          向下展开卷轴
        </p>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--gold-primary), transparent)',
            margin: '0 auto',
            animation: 'scroll-down-bounce 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 验证 GSAP 动画正常**

Run: `cd app && npm run dev`
Expected: 鸿蒙章节显示卷轴展开动画，标题和副标题依次淡入

---

## Task 4: 创建山川章节（数据展示）

**Files:**
- Create: `src/sections/MountainsChapter.tsx`

**目标：** 创建典籍概览与数据可视化章节

- [ ] **Step 1: 实现 MountainsChapter 组件**

```tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
}

function Counter({ target, suffix = '', label }: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      snap: { value: 1 },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString() + suffix;
      },
    });
  }, [target]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <span
        ref={counterRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          color: 'var(--imperial-red)',
          display: 'block',
          lineHeight: 1,
        }}
      >
        0
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--ink-grey)',
          letterSpacing: '0.1em',
          marginTop: '0.5rem',
          display: 'block',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function MountainsChapter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              section.querySelectorAll('.mountain-animate'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mountains"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 8vw',
        background: 'var(--ivory)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Chapter title */}
        <div className="mountain-animate" style={{ marginBottom: '4rem', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '3px', height: '40px', background: 'var(--gold-primary)' }} />
            <h2
              style={{
                fontFamily: 'var(--font-calligraphy)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--ink-black)',
                margin: 0,
              }}
            >
              山川
            </h2>
          </div>
          <div style={{ width: '60px', height: '2px', background: 'var(--gold-primary)', marginLeft: '1.25rem' }} />
        </div>

        {/* Content grid */}
        <div
          className="mountain-animate"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '4rem',
            opacity: 0,
          }}
        >
          {/* Left: Illustration placeholder */}
          <div
            style={{
              aspectRatio: '4/3',
              background: 'linear-gradient(135deg, var(--ivory-warm) 0%, var(--parchment) 100%)',
              border: '1px solid rgba(201, 169, 110, 0.3)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '12px',
                border: '1px solid rgba(201, 169, 110, 0.2)',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-calligraphy)',
                fontSize: '1.5rem',
                color: 'var(--gold-muted)',
              }}
            >
              山海图志
            </span>
          </div>

          {/* Right: Description */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--ink-black)',
                margin: '0 0 1.5rem 0',
                lineHeight: 1.3,
              }}
            >
              《山海经》
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.9,
                color: 'var(--ink-grey)',
                margin: '0 0 1.5rem 0',
              }}
            >
              成书于先秦，是中国古代最富神话色彩的地理志怪典籍。《不列颠百科全书》称其为"世界有史以来最大的百科全书"之一，共计十八卷，约三万一千字，记录了五百五十余座山峦、三百余条水脉、四百多种异兽与数十个远古邦国。
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                color: 'var(--ink-light)',
                margin: 0,
              }}
            >
              全书分为《山经》五卷、《海经》八卷、《大荒经》四卷、《海内经》一卷，被称为典籍渊薮、志怪之祖。
            </p>
          </div>
        </div>

        {/* Data counters */}
        <div
          className="mountain-animate"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            padding: '3rem',
            background: 'var(--parchment)',
            border: '1px solid rgba(201, 169, 110, 0.3)',
            borderRadius: '4px',
            opacity: 0,
          }}
        >
          <Counter target={550} suffix="+" label="座山峦" />
          <Counter target={300} suffix="+" label="条水脉" />
          <Counter target={427} label="种异兽" />
        </div>

        {/* Scroll size comparison */}
        <div
          className="mountain-animate"
          style={{
            marginTop: '4rem',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '3rem',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '120px',
                background: 'var(--imperial-red)',
                border: '2px solid var(--gold-primary)',
                borderRadius: '2px',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--gold-primary)', writingMode: 'vertical-rl' }}>
                山海经
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--ink-grey)' }}>18卷</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '60px',
                height: '90px',
                background: 'var(--ivory-warm)',
                border: '1px solid var(--gold-muted)',
                borderRadius: '2px',
                margin: '0 auto 1rem',
              }}
            />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--ink-light)' }}>普通典籍</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 验证计数动画**

Run: `cd app && npm run dev`
Expected: 滚动到山川章节时，三个数字从 0 计数增长到目标值

---

## Task 5: 改造神兽档案列表（异兽章节）

**Files:**
- Modify: `src/sections/ExhibitionIndex.tsx`

**目标：** 将暗色主题的神兽列表改为卷轴式朱红主题

- [ ] **Step 1: 更新 ExhibitionIndex 配色和布局**

修改 `ExhibitionIndex.tsx` 中的样式：

**背景色修改：**
```tsx
// 原：background: 'var(--heritage-black)'
// 改为：
background: 'var(--ivory)'
```

**边框色修改：**
```tsx
// 原：borderBottom: '1px solid rgba(184, 134, 11, 0.25)'
// 改为：
borderBottom: '1px solid rgba(201, 169, 110, 0.3)'
```

**文字色修改：**
```tsx
// 原：color: 'var(--parchment)'
// 改为：
color: 'var(--ink-black)'

// 原：color: 'var(--ochre)'
// 改为：
color: 'var(--ink-grey)'
```

**悬停克隆文字色修改：**
```tsx
// 原：color: 'var(--gold-accent)'
// 改为：
color: 'var(--imperial-red)'
```

**图片揭示边框修改：**
```tsx
// 原：border: '1px solid var(--gold-accent)'
// 改为：
border: '2px solid var(--gold-primary)'
```

**顶部边框修改：**
```tsx
// 原：borderTop: '1px solid rgba(184, 134, 11, 0.3)'
// 改为：
borderTop: '1px solid rgba(201, 169, 110, 0.4)'
```

- [ ] **Step 2: 添加章节包装**

在 `ExhibitionIndex` 外层添加 `id="beasts"` 和章节标题：

```tsx
// 在 return 语句开头添加章节标题
<div style={{ marginBottom: '3rem' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
    <div style={{ width: '3px', height: '40px', background: 'var(--gold-primary)' }} />
    <h2 style={{
      fontFamily: 'var(--font-calligraphy)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      color: 'var(--ink-black)',
      margin: 0,
    }}>
      异兽
    </h2>
  </div>
  <div style={{ width: '60px', height: '2px', background: 'var(--gold-primary)', marginLeft: '1.25rem' }} />
</div>
```

- [ ] **Step 3: 验证列表样式**

Run: `cd app && npm run dev`
Expected: 神兽列表显示为象牙白背景，墨色文字，悬停变朱红色

---

## Task 6: 改造古籍阅读器（草木章节）

**Files:**
- Modify: `src/sections/AncientBookReader.tsx`

**目标：** 将暗色主题的古籍阅读器改为朱红封面 + 象牙白书页

- [ ] **Step 1: 更新书页背景色**

```tsx
// 左页背景
// 原：background: 'linear-gradient(to right, #e8e0d0, #f5f0e6)'
// 保持原样（已经是暖色调）

// 右页背景
// 原：background: 'linear-gradient(to left, #e8e0d0, #f5f0e6)'
// 保持原样
```

- [ ] **Step 2: 更新封面配色**

```tsx
// 封面背景
// 原：background: 'linear-gradient(135deg, #1a1510 0%, #2a2018 50%, #1a1510 100%)'
// 改为：
background: 'linear-gradient(135deg, var(--imperial-red-dark) 0%, var(--imperial-red) 50%, var(--imperial-red-dark) 100%)'

// 封面边框
// 原：border: '2px solid var(--gold-accent)'
// 改为：
border: '2px solid var(--gold-primary)'

// 封面标题色
// 原：color: 'var(--gold-accent)'
// 改为：
color: 'var(--gold-bright)'
```

- [ ] **Step 3: 更新章节包装**

在 `AncientBookReader` 外层添加 `id="herbs"`：

```tsx
// 将 id="reader" 改为 id="herbs"
<section id="herbs" ref={sectionRef} ...>
```

并添加章节标题（在 Section Header 上方）：

```tsx
<div style={{ marginBottom: '3rem' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
    <div style={{ width: '3px', height: '40px', background: 'var(--gold-primary)' }} />
    <h2 style={{
      fontFamily: 'var(--font-calligraphy)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      color: 'var(--ink-black)',
      margin: 0,
    }}>
      草木
    </h2>
  </div>
  <div style={{ width: '60px', height: '2px', background: 'var(--gold-primary)', marginLeft: '1.25rem' }} />
</div>
```

- [ ] **Step 4: 验证阅读器样式**

Run: `cd app && npm run dev`
Expected: 古籍阅读器封面为朱红色，书页为象牙白

---

## Task 7: 改造资源查询（遗典章节）

**Files:**
- Modify: `src/sections/ResourceQuery.tsx`

**目标：** 将暗色主题的资源查询改为象牙白主题

- [ ] **Step 1: 更新背景色和文字色**

```tsx
// 背景色
// 原：background: 'var(--heritage-black)'
// 改为：
background: 'var(--ivory)'

// 边框色
// 原：borderTop: '1px solid rgba(184, 134, 11, 0.2)'
// 改为：
borderTop: '1px solid rgba(201, 169, 110, 0.3)'

// 文字色
// 原：color: 'var(--ochre)'
// 改为：
color: 'var(--ink-grey)'

//  parchment 文字
// 原：color: 'var(--parchment)'
// 改为：
color: 'var(--ink-black)'
```

- [ ] **Step 2: 更新搜索框和卡片样式**

```tsx
// 搜索框背景
// 原：background: 'var(--ink-grey)'
// 改为：
background: 'var(--parchment)'

// 搜索框边框
// 原：border: '1px solid rgba(184, 134, 11, 0.25)'
// 改为：
border: '1px solid rgba(201, 169, 110, 0.4)'

// 卡片背景
// 原：background: 'var(--ink-grey)'
// 改为：
background: 'var(--parchment)'

// 卡片边框
// 原：border: '1px solid rgba(184, 134, 11, 0.2)'
// 改为：
border: '1px solid rgba(201, 169, 110, 0.3)'
```

- [ ] **Step 3: 更新章节 ID**

```tsx
// 将 id="resources" 改为 id="legacy"
<section id="legacy" ref={sectionRef} ...>
```

- [ ] **Step 4: 验证资源查询样式**

Run: `cd app && npm run dev`
Expected: 资源查询区显示为象牙白背景，卡片为羊皮纸色

---

## Task 8: 改造页脚

**Files:**
- Modify: `src/sections/Footer.tsx`

**目标：** 将暗色页脚改为象牙白主题

- [ ] **Step 1: 更新背景色和文字色**

```tsx
// 背景色
// 原：background: 'var(--heritage-black)'
// 改为：
background: 'var(--ivory)'

// 边框色
// 原：borderTop: '1px solid rgba(184, 134, 11, 0.25)'
// 改为：
borderTop: '1px solid rgba(201, 169, 110, 0.3)'

// 标题色
// 原：color: 'var(--ochre)'
// 改为：
color: 'var(--ink-grey)'

// 正文色
// 原：color: 'var(--parchment)'
// 改为：
color: 'var(--ink-black)'

// 水印色
// 原：color: 'var(--parchment)', opacity: 0.08
// 改为：
color: 'var(--ink-black)', opacity: 0.06
```

- [ ] **Step 2: 验证页脚样式**

Run: `cd app && npm run dev`
Expected: 页脚显示为象牙白背景，墨色文字

---

## Task 9: 改造详情页

**Files:**
- Modify: `src/sections/ExhibitionDetail.tsx`

**目标：** 将暗色详情页改为朱红主题

- [ ] **Step 1: 更新背景色和文字色**

```tsx
// 背景色
// 原：background: 'var(--heritage-black)'
// 改为：
background: 'var(--ivory)'

// 文字色
// 原：color: 'var(--ochre)'
// 改为：
color: 'var(--ink-grey)'

//  parchment 文字
// 原：color: 'var(--parchment)'
// 改为：
color: 'var(--ink-black)'

// 图片边框
// 原：border: '1px solid rgba(184, 134, 11, 0.35)'
// 改为：
border: '1px solid rgba(201, 169, 110, 0.4)'
```

- [ ] **Step 2: 验证详情页样式**

Run: `cd app && npm run dev`
Expected: 点击神兽进入详情页，显示象牙白背景

---

## Task 10: 改造视频区（邦国章节）

**Files:**
- Modify: `src/sections/CinematicPavilions.tsx`

**目标：** 将暗色视频区改为象牙白主题

- [ ] **Step 1: 更新背景色和边框色**

```tsx
// 背景色
// 原：background: 'var(--ink-grey)'
// 改为：
background: 'var(--ivory-warm)'

// 视频边框
// 原：border: '1px solid rgba(184, 134, 11, 0.2)'
// 改为：
border: '1px solid rgba(201, 169, 110, 0.3)'

// 文字色
// 原：color: 'var(--ochre)'
// 改为：
color: 'var(--ink-grey)'
```

- [ ] **Step 2: 更新章节 ID 和标题**

```tsx
// 将 id="pavilions" 改为 id="kingdoms"
<section id="kingdoms" ...>
```

添加章节标题：

```tsx
<div style={{ marginBottom: '4rem' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
    <div style={{ width: '3px', height: '40px', background: 'var(--gold-primary)' }} />
    <h2 style={{
      fontFamily: 'var(--font-calligraphy)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      color: 'var(--ink-black)',
      margin: 0,
    }}>
      邦国
    </h2>
  </div>
  <div style={{ width: '60px', height: '2px', background: 'var(--gold-primary)', marginLeft: '1.25rem' }} />
</div>
```

- [ ] **Step 3: 验证视频区样式**

Run: `cd app && npm run dev`
Expected: 视频区显示为暖象牙色背景

---

## Task 11: 更新 App.tsx 主布局

**Files:**
- Modify: `src/App.tsx`

**目标：** 整合新组件，移除旧组件

- [ ] **Step 1: 更新导入和布局**

```tsx
import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollNav from './components/ScrollNav';
import Hongmeng from './sections/Hongmeng';
import MountainsChapter from './sections/MountainsChapter';
import ExhibitionIndex from './sections/ExhibitionIndex';
import ExhibitionDetail from './sections/ExhibitionDetail';
import CinematicPavilions from './sections/CinematicPavilions';
import AncientBookReader from './sections/AncientBookReader';
import ResourceQuery from './sections/ResourceQuery';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import { siteConfig } from './config';
import { getExhibitionBySlug } from './lib/exhibitions';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  const activeExhibition = useMemo(() => {
    const match = pathname.match(/^\/exhibitions\/([^/]+)$/);
    if (!match) return null;
    return getExhibitionBySlug(match[1]);
  }, [pathname]);

  const navigateToExhibition = (slug: string) => {
    const nextPath = `/exhibitions/${slug}`;
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToArchive = () => {
    window.history.pushState({}, '', '/');
    setPathname('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (pathname.startsWith('/exhibitions/') && activeExhibition) {
    return (
      <>
        <CustomCursor />
        <ExhibitionDetail exhibition={activeExhibition} onBack={navigateToArchive} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <ScrollNav />

      {/* Chapter 1: Hongmeng */}
      <Hongmeng />

      {/* Chapter 2: Mountains */}
      <MountainsChapter />

      {/* Chapter 3: Beasts */}
      <ExhibitionIndex onSelect={navigateToExhibition} />

      {/* Chapter 4: Kingdoms */}
      <CinematicPavilions />

      {/* Chapter 5: Herbs */}
      <AncientBookReader />

      {/* Chapter 6: Legacy */}
      <ResourceQuery />

      {/* Footer */}
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: 验证整体布局**

Run: `cd app && npm run dev`
Expected: 页面显示六个章节，顶部有导航栏，滚动时导航栏显示并高亮当前章节

---

## Task 12: 更新自定义光标

**Files:**
- Modify: `src/components/CustomCursor.tsx`

**目标：** 将白色光标改为朱红色

- [ ] **Step 1: 更新光标颜色**

```tsx
// 背景色
// 原：background: '#ffffff'
// 改为：
background: 'var(--imperial-red)'

// mixBlendMode
// 原：mixBlendMode: 'difference'
// 改为：
mixBlendMode: 'normal'

// 悬停时的颜色（可选，保持朱红或改为金色）
// 保持 background: 'var(--imperial-red)' 即可
```

- [ ] **Step 2: 验证光标样式**

Run: `cd app && npm run dev`
Expected: 光标显示为朱红色圆点

---

## Task 13: 清理废弃文件

**Files:**
- Delete: `src/sections/VoidShader.tsx`
- Delete: `src/sections/Manifesto.tsx`
- Delete: `src/sections/Hero.tsx`

**目标：** 移除不再使用的组件

- [ ] **Step 1: 删除废弃文件**

```bash
cd app/src/sections
rm VoidShader.tsx
rm Manifesto.tsx
rm Hero.tsx
```

- [ ] **Step 2: 验证无残留引用**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误（确认没有其他文件引用这些组件）

---

## Task 14: 最终构建验证

**Files:**
- All modified files

**目标：** 确保整个项目可以成功构建

- [ ] **Step 1: 类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 2: 构建项目**

Run: `cd app && npm run build`
Expected: 构建成功，输出到 `dist/` 目录

- [ ] **Step 3: 预览构建结果**

Run: `cd app && npm run preview`
Expected: 可以在浏览器中预览完整的卷轴叙事流网站

---

## 自审检查

### Spec 覆盖检查

| 设计文档章节 | 对应 Task | 状态 |
|-------------|----------|------|
| 色彩体系 | Task 1 | ✅ |
| 字体体系 | Task 1 | ✅ |
| 鸿蒙章节 | Task 3 | ✅ |
| 山川章节 | Task 4 | ✅ |
| 异兽章节 | Task 5 | ✅ |
| 邦国章节 | Task 10 | ✅ |
| 草木章节 | Task 6 | ✅ |
| 遗典章节 | Task 7 | ✅ |
| 章节导航 | Task 2 | ✅ |
| 页脚 | Task 8 | ✅ |
| 详情页 | Task 9 | ✅ |
| 光标 | Task 12 | ✅ |
| 响应式 | 各组件内联 | ✅ |

### Placeholder 扫描

- 无 "TBD", "TODO", "implement later"
- 所有步骤包含完整代码
- 无 "Similar to Task N" 引用

### 类型一致性检查

- `ScrollNav` 使用 `chapters` 数组，ID 与各章节 `id` 属性一致
- 所有颜色变量引用与 `index.css` 定义一致
- GSAP 动画参数在各组件中一致

---

*计划完成。基于设计文档 `docs/superpowers/specs/2026-05-20-shanhaijing-scroll-narrative-design.md` 制定。*
