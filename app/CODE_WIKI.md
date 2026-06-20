# 山海经古籍数字档案馆 — Code Wiki

> 项目定位：沉浸式《山海经》古籍数字化展示平台，融合卷轴叙事流、3D 地球可视化、神兽档案与古籍在线阅读系统。

---

## 一、项目概览

| 属性 | 说明 |
|------|------|
| **技术栈** | React 19 + TypeScript + Vite + Tailwind CSS + GSAP |
| **3D 渲染** | Three.js + three-globe |
| **UI 组件库** | shadcn/ui (Radix UI 底层) |
| **构建工具** | Vite 7 + Terser |
| **主题风格** | 永乐大典卷轴风格 — 皇家朱红 + 金色 + 象牙白 |

---

## 二、目录结构

```
app/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ui/              # shadcn/ui 组件库 (50+ 组件)
│   │   ├── AnnotationPopup.tsx    # 注释弹窗
│   │   ├── ChapterNav.tsx         # 章节导航
│   │   ├── ClassicalReader.tsx    # 古籍阅读器主组件
│   │   ├── CustomCursor.tsx       # 自定义鼠标光标
│   │   ├── ExternalLinks.tsx      # 外部平台链接
│   │   ├── Globe.tsx              # 3D 地球模型
│   │   ├── GlobePlaceholder.tsx   # 地球加载占位
│   │   ├── ScrollNav.tsx          # 滚动导航栏
│   │   └── VerticalText.tsx       # 竖排文字渲染
│   ├── data/
│   │   └── classicalTexts.ts      # 古籍数据（山海经等）
│   ├── hooks/
│   │   └── use-mobile.ts          # 移动端检测 Hook
│   ├── lib/
│   │   ├── exhibitions.ts         # 展览数据工具
│   │   └── utils.ts               # 通用工具函数
│   ├── sections/              # 页面区块组件
│   │   ├── AncientBookReader.tsx  # 3D 古籍展示
│   │   ├── CinematicPavilions.tsx # 视频展区
│   │   ├── ExhibitionDetail.tsx   # 神兽详情页
│   │   ├── ExhibitionIndex.tsx    # 神兽档案列表
│   │   ├── Footer.tsx             # 页脚
│   │   ├── Hero.tsx               # 首屏英雄区
│   │   ├── Hongmeng.tsx           # 鸿蒙卷轴动画
│   │   ├── Manifesto.tsx          # 宣言区
│   │   ├── MountainsChapter.tsx   # 山川数据可视化
│   │   ├── ResourceQuery.tsx      # 遗典古籍资源查询
│   │   ├── VoidShader.tsx         # 虚空着色器背景
│   │   └── WorldDistribution.tsx  # 世界分布（地球）
│   ├── types/
│   │   └── classical.ts           # 古籍类型定义
│   ├── App.css
│   ├── App.tsx                # 根组件 + 路由
│   ├── config.ts              # 站点全局配置
│   ├── index.css              # 全局样式 + 主题变量
│   └── main.tsx               # 应用入口
├── package.json
├── vite.config.ts
├── tsconfig.json
└── CODE_WIKI.md               # 本文档
```

---

## 三、核心模块详解

### 3.1 路由与页面结构 ([App.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/App.tsx))

采用**原生 History API** 实现客户端路由（无 React Router）：

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 卷轴叙事流，7 个章节依次排列 |
| `/exhibitions/:slug` | 神兽详情 | 九尾狐、凤凰、烛龙等档案 |
| `/reader/:textId` | 古籍阅读器 | 竖排/横排阅读，逐字注释 |

**关键代码**：
```tsx
// 路由判断
if (pathname.startsWith('/reader/')) {
  return <><CustomCursor /><Suspense><ClassicalReader /></Suspense></>;
}
if (pathname.startsWith('/exhibitions/') && activeExhibition) {
  return <><CustomCursor /><ExhibitionDetail ... /></>;
}
// 默认首页
return <><CustomCursor /><ScrollNav /><Hongmeng />...<Footer /></>;
```

**导航函数**：
- `navigateToExhibition(slug)` — 跳转到神兽详情
- `navigateToArchive()` — 返回首页
- 阅读器内使用 `window.history.pushState` 直接导航

---

### 3.2 配置中心 ([config.ts](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/config.ts))

集中管理所有内容配置：

```typescript
// 站点元数据
siteConfig: { language, siteTitle, siteDescription }

// 导航
navigationConfig: { brandName: "山海经", links: [...] }

// 英雄区
heroConfig: { titleLines: ["山海经"], subtitle: "上古奇书 · 志怪地理之祖" }

// 宣言
manifestoConfig: { headingText, bodyText, videoPath }

// 神兽档案（6 只）
exhibitionsConfig: { sectionLabel, countLabel, items: [
  { slug, title, image, year, eyebrow, intro, sections: [{heading, body}] }
]}

// 视频展区
pavilionsConfig: { sectionLabel, videos: [{src, caption}] }

// 页脚
footerConfig: { visitLabel, visitLines, connectLabel, connectLinks, ... }
```

---

### 3.3 主题与样式系统 ([index.css](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/index.css))

**CSS 变量（皇家朱红主题）**：

```css
:root {
  --imperial-red: #8B1A1A;        /* 皇家朱红 */
  --imperial-red-light: #A52A2A;
  --imperial-red-dark: #5C0F0F;
  --gold-primary: #C9A96E;         /* 金色主色 */
  --gold-bright: #D4AF37;
  --gold-muted: #9A8B6F;
  --ivory: #F5F0E8;                /* 象牙白背景 */
  --ivory-warm: #EDE6D6;
  --parchment: #FAF6F0;            /* 宣纸色 */
  --ink-black: #1A1A1A;            /* 墨色 */
  --ink-grey: #4A4A4A;
  
  /* 古籍阅读器专用 */
  --color-royal-red: #8B1A1A;
  --color-gold: #C9A96E;
  --color-ivory: #F5F0E8;
  --color-ink: #1A1A1A;
}
```

**字体栈**：
- 展示字体：`Noto Serif SC`, `ZCOOL XiaoWei`, `Times New Roman`
- 正文字体：`Noto Sans SC`, `Helvetica Neue`
- 书法字体：`ZCOOL XiaoWei`, `Noto Serif SC`

---

### 3.4 3D 地球组件 ([Globe.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/components/Globe.tsx))

基于 **three-globe** + **Three.js** 构建：

| 特性 | 实现 |
|------|------|
| 地球纹理 | 本地贴图 `earth-blue-marble.jpg` + `earth-topology.png` |
| 自转 | `autoRotate = true`, `autoRotateSpeed = 0.5` |
| 轴倾角 | 23.5° 倾斜（真实地球） |
| 交互 | OrbitControls 拖拽旋转 + 滚轮缩放 |
| 标记点 | 金色发光标记（山海经地理位置） |

**性能优化**：
- 使用 `React.lazy` 动态导入
- 独立 chunk：`Globe-xxx.js` (23.62KB gzip)

---

### 3.5 古籍数字化阅览系统

#### 类型定义 ([types/classical.ts](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/types/classical.ts))

```typescript
interface WordAnnotation {
  id: string; word: string; pinyin: string;
  explanation: string; position: number;
}

interface Chapter {
  id: string; title: string; traditionalTitle: string;
  content: string; traditionalContent: string;
  annotations: WordAnnotation[]; pageNumber: number;
}

interface ClassicalText {
  id: string; title: string; traditionalTitle: string;
  author: string; dynasty: string; description: string;
  chapters: Chapter[]; externalLinks: ExternalLink[];
}
```

#### 数据层 ([data/classicalTexts.ts](file:///f:/Kimi_Agent_山海经数字化展示/app/src/data/classicalTexts.ts))

当前收录 **《山海经》** 三章：
- 南山经（招摇之山、祝余、迷榖、狌狌等）
- 西山经（羬羊、肥遗等）
- 北山经（滑鱼等）

每章包含：简体正文、繁体正文、逐字注释（拼音+释义）。

#### 阅读器组件 ([ClassicalReader.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/components/ClassicalReader.tsx))

**功能特性**：

| 功能 | 说明 |
|------|------|
| 竖排/横排切换 | `writing-mode: vertical-rl` 实现古籍竖排 |
| 繁简切换 | 预存两套文本，即时切换 |
| 逐字注释 | 点击标注词汇弹出释义卡片 |
| 章节导航 | 上一章/下一章，显示当前进度 |
| 外部链接 | 识典古籍、国家图书馆、中国哲学书电子化计划等 |

**子组件**：
- `VerticalText` — 竖排文字渲染 + 标注词高亮
- `AnnotationPopup` — 注释弹窗（拼音+释义）
- `ChapterNav` — 章节切换导航
- `ExternalLinks` — 延伸阅读平台链接

---

### 3.6 自定义光标 ([CustomCursor.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/components/CustomCursor.tsx))

- 默认：12px 朱红色圆点
- 悬停链接/按钮：48px 半透明放大效果
- 使用 `requestAnimationFrame` 平滑跟随
- `pointer-events: none` 不阻挡交互

---

### 3.7 滚动导航 ([ScrollNav.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/components/ScrollNav.tsx))

- 固定顶部导航栏
- 章节锚点：`#hongmeng`, `#exhibitions`, `#reader`, `#resources`, `#manifesto`
- 滚动时自动高亮当前章节
- 与 GSAP ScrollTrigger 配合

---

## 四、关键依赖说明

### 生产依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `react` | ^19.2.0 | UI 框架 |
| `react-dom` | ^19.2.0 | DOM 渲染 |
| `three` | ^0.184.0 | 3D 渲染引擎 |
| `three-globe` | ^2.45.2 | 3D 地球组件 |
| `gsap` | ^3.14.2 | 动画引擎（含 ScrollTrigger） |
| `lucide-react` | ^0.562.0 | 图标库 |
| `tailwind-merge` | ^3.4.0 | Tailwind 类名合并 |
| `class-variance-authority` | ^0.7.1 | 组件变体管理 |
| `@radix-ui/*` | ^1.x | shadcn/ui 底层组件 |

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `vite` | ^7.2.4 | 构建工具 |
| `typescript` | ~5.9.3 | 类型系统 |
| `tailwindcss` | ^3.4.19 | CSS 框架 |
| `terser` | ^5.47.1 | JS 压缩 |
| `@vitejs/plugin-react` | ^5.1.1 | React 插件 |

---

## 五、构建配置 ([vite.config.ts](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/vite.config.ts))

```typescript
export default defineConfig({
  base: './',                    // 相对路径部署
  plugins: [react()],
  resolve: { alias: { "@": "./src" } },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-globe'],  // 1.68MB
          'ui-vendor': ['react', 'react-dom'],        // 基础 UI
          'gsap-vendor': ['gsap'],                    // 动画库
        },
      },
    },
  },
});
```

**代码分割策略**：
- `three-vendor`: Three.js + three-globe (大体积独立 chunk)
- `ui-vendor`: React 核心
- `gsap-vendor`: GSAP 动画
- `ClassicalReader`: 懒加载 (20KB gzip)
- `Globe`: 懒加载 (24KB gzip)

---

## 六、页面区块（Sections）

| 区块 | 文件 | 功能 |
|------|------|------|
| 鸿蒙 | [Hongmeng.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/Hongmeng.tsx) | 卷轴展开动画，标题入场 |
| 神兽档案 | [ExhibitionIndex.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/ExhibitionIndex.tsx) | 异兽卡片网格，点击跳转详情 |
| 神兽详情 | [ExhibitionDetail.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/ExhibitionDetail.tsx) | 图文详情，多段落展示 |
| 世界分布 | [WorldDistribution.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/WorldDistribution.tsx) | 3D 地球展示 |
| 远古疆域 | [CinematicPavilions.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/CinematicPavilions.tsx) | 视频展区 |
| 3D 古籍 | [AncientBookReader.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/AncientBookReader.tsx) | 3D 翻书效果 |
| 遗典 | [ResourceQuery.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/ResourceQuery.tsx) | 古籍资源查询与卡片展示 |
| 宣言 | [Manifesto.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/Manifesto.tsx) | 项目介绍文字 |
| 山川 | [MountainsChapter.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/MountainsChapter.tsx) | 数据统计动画 |
| 页脚 | [Footer.tsx](file:///f:/Axm/Kimi_Agent_山海经数字化展示/app/src/sections/Footer.tsx) | 联系信息 |

---

## 七、运行方式

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev          # http://localhost:5173/

# 生产构建
npm run build        # 输出到 dist/ 目录

# 预览构建产物
npm run preview

# 代码检查
npm run lint
```

---

## 八、迭代记录

| 迭代 | 日期 | 主要内容 |
|------|------|----------|
| Iteration 1 | 2026-05-19 | 项目基础架构、卷轴叙事流、3D 地球 |
| Iteration 2 | 2026-05-20 | 性能优化（代码分割、懒加载、Terser） |
| Iteration 3 | 2026-05-21 | 古籍数字化阅览系统（竖排文字、注释、章节导航） |
| Iteration 4 | 2026-05-21 | 遗典卡片重设计（宣纸材质、统一阅读按钮）、光标修复 |

---

## 九、技术债务与待优化

- [ ] 路由系统当前使用原生 History API，如需更复杂路由建议引入 `react-router-dom`
- [ ] 古籍数据目前硬编码，后续可改为本地 JSON 或 API 加载
- [ ] 竖排文字标注定位采用简单字符位置算法，复杂排版需优化
- [ ] 繁简转换采用预存双文本方案，可考虑实时转换库
- [ ] 3D 地球 chunk 体积较大 (1.68MB)，可进一步优化贴图压缩
