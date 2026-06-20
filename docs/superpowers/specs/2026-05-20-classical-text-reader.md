# 古籍数字化阅览系统 - 设计文档

> **目标**：打造专业级古籍数字化阅览体验，模拟识典古籍等平台的竖排文字、影印对照、逐字注释等功能
> **方案**：本地高质量古籍数据 + 专业阅览器组件 + 外部平台链接补充
> **设计日期**：2026-05-20

---

## 一、功能需求

### 1.1 核心阅览功能

| 功能 | 说明 | 优先级 |
|------|------|--------|
| 竖排文字 | `writing-mode: vertical-rl`，从右至左阅读 | 高 |
| 影印本对照 | 左侧影印图像，右侧数字化文本 | 高 |
| 逐字注释 | 点击字词弹出注释/白话翻译 | 高 |
| 繁简切换 | 一键切换繁体/简体显示 | 中 |
| 章节导航 | 卷 → 章 → 节的层级导航 | 高 |
| 阅读进度 | 记录阅读位置，支持书签 | 中 |
| 全文检索 | 在单部古籍内搜索关键词 | 中 |

### 1.2 外部链接补充

| 平台 | 链接类型 | 说明 |
|------|---------|------|
| 识典古籍 | 跳转阅读 | "在识典古籍中阅读"按钮 |
| 中华古籍资源库 | 跳转影像 | "查看国家图书馆藏本"按钮 |
| 维基文库 | 跳转原文 | "查看维基文库"按钮 |

---

## 二、数据结构

### 2.1 古籍元数据

```typescript
interface ClassicalText {
  id: string;                    // 唯一标识
  title: string;                 // 书名
  originalTitle?: string;        // 原名（如《山海经》）
  author: string;                // 作者
  dynasty: string;               // 朝代
  category: string;              // 分类（经史子集）
  description: string;           // 简介
  totalPages: number;            // 总页数/卷数
  externalLinks: {
    shidianguji?: string;        // 识典古籍链接
    nlc?: string;                // 国家图书馆链接
    wikisource?: string;         // 维基文库链接
  };
  chapters: Chapter[];           // 章节列表
}
```

### 2.2 章节结构

```typescript
interface Chapter {
  id: string;
  title: string;                 // 章节标题
  originalText: string;          // 原文（繁体）
  simplifiedText?: string;       // 简体版本
  annotation?: string;           // 章节注释
  pages: Page[];                 // 分页（对照模式用）
  wordAnnotations?: WordAnnotation[]; // 逐字注释
}

interface Page {
  pageNumber: number;
  imageUrl?: string;             // 影印图像 URL
  text: string;                  // 该页文字
}

interface WordAnnotation {
  word: string;                  // 被注释的字词
  position: { start: number; end: number }; // 在原文中的位置
  explanation: string;           // 注释内容
  pronunciation?: string;        // 拼音/注音
}
```

---

## 三、组件设计

### 3.1 古籍阅览器主组件

```
┌─────────────────────────────────────────────────────────────┐
│  [返回]  山海经 · 南山经      [繁|简] [影印|文本] [设置]    │
├──────────────────────┬──────────────────────────────────────┤
│                      │                                      │
│   [影印图像]          │   南山经之首曰鹊山。其首曰招摇之山    │
│   [扫描版古籍页面]     │   临于西海之上，多桂，多金玉。        │
│                      │   有草焉，其状如韭而青华...           │
│                      │                                      │
│                      │   【注释】                            │
│                      │   招摇之山：传说中的仙山...           │
│                      │                                      │
├──────────────────────┴──────────────────────────────────────┤
│  ◀ 上一页              第 3 页 / 18 页              下一页 ▶  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 组件清单

| 组件 | 文件 | 职责 |
|------|------|------|
| ClassicalReader | `src/components/ClassicalReader.tsx` | 主阅览器容器 |
| VerticalText | `src/components/VerticalText.tsx` | 竖排文字渲染 |
| PageImage | `src/components/PageImage.tsx` | 影印图像展示 |
| AnnotationPopup | `src/components/AnnotationPopup.tsx` | 逐字注释弹窗 |
| ChapterNav | `src/components/ChapterNav.tsx` | 章节导航树 |
| ExternalLinks | `src/components/ExternalLinks.tsx` | 外部平台链接 |
| TextToolbar | `src/components/TextToolbar.tsx` | 工具栏（繁简切换等） |

---

## 四、样式设计

### 4.1 竖排文字样式

```css
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  line-height: 2.5;
  letter-spacing: 0.15em;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', serif;
  font-size: 1.1rem;
  color: var(--ink-black);
}

/* 标点符号在竖排中的处理 */
.vertical-text .punctuation {
  text-combine-upright: all;
}
```

### 4.2 影印本样式

```css
.page-image {
  background: var(--parchment);
  border: 1px solid var(--gold-muted);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  filter: sepia(20%) contrast(95%);
}
```

### 4.3 注释弹窗样式

```css
.annotation-popup {
  background: var(--ivory);
  border: 1px solid var(--gold-primary);
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(139, 26, 26, 0.15);
  max-width: 300px;
}
```

---

## 五、交互设计

### 5.1 逐字注释交互

1. 鼠标悬停在可注释字词上 → 字词下方显示金色下划线
2. 点击字词 → 弹出注释卡片
3. 点击其他地方或按 ESC → 关闭注释

### 5.2 影印/文本切换

- 默认：纯文本模式（竖排）
- 点击"影印对照" → 左侧显示影印图像，右侧显示文本
- 影印图像支持缩放、拖拽查看

### 5.3 繁简切换

- 默认：繁体（保留古籍原貌）
- 点击"简"按钮 → 切换为简体显示
- 使用 `opencc-js` 或预生成的简体数据

---

## 六、数据准备

### 6.1 首批收录古籍

| 古籍 | 卷数 | 数据状态 |
|------|------|---------|
| 《山海经》 | 18卷 | 已有基础数据，需扩展 |
| 《淮南子》 | 21卷 | 需整理 |
| 《神异经》 | 8卷 | 需整理 |

### 6.2 外部链接映射

```typescript
const externalLinks: Record<string, { shidianguji?: string; wikisource?: string }> = {
  'shanhaijing': {
    shidianguji: 'https://www.shidianguji.com/book/...',
    wikisource: 'https://zh.wikisource.org/wiki/山海经',
  },
  'huainanzi': {
    shidianguji: 'https://www.shidianguji.com/book/...',
    wikisource: 'https://zh.wikisource.org/wiki/淮南子',
  },
};
```

---

## 七、与现有系统的集成

### 7.1 替换现有 AncientBookReader

现有的 `AncientBookReader.tsx` 是一个 3D 翻书效果，但内容有限。新的 `ClassicalReader` 将：
- 保留 3D 翻书作为"开卷"动画入口
- 进入后切换到专业阅览模式
- 或在新的路由 `/reader/:textId` 中独立展示

### 7.2 与 ResourceQuery 集成

在资源查询卡片上添加"在线阅读"按钮，点击进入 `ClassicalReader`。

---

## 八、性能考量

1. **大数据量处理**：古籍文本可能很长，使用虚拟滚动（react-window）
2. **影印图像优化**：使用 IIIF 标准的分级加载（先低分辨率，后高分辨率）
3. **繁简转换**：预生成简体数据，避免实时转换的性能开销

---

*本文档为古籍数字化阅览系统的设计规格说明书。*
