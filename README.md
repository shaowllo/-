# 山海经数字化展示

> 基于 Vite + React + TypeScript 的《山海经》互动式数字化展示平台。

## 功能模块

- **3D 地球仪** — 基于 Three.js 与 three-globe，展示远古疆域的地理分布
- **古籍阅读器** — 古典竖排文本阅读体验，含《山海经》章节导航
- **神兽档案** — 六种上古异兽的图文详情展示（九尾狐、凤凰、烛龙、饕餮、麒麟、白泽）
- **交互式地图集** — 标注异兽出没地点，支持筛选与详情弹窗
- **卷轴动画叙事** — 使用 GSAP 驱动的滚动触发动画
- **数字卷宗** — 沉浸式展览级的页面布局与切换

## 技术栈

| 技术            | 用途                   |
| --------------- | ---------------------- |
| React 19        | 前端框架               |
| TypeScript      | 类型安全               |
| Vite 7          | 构建工具               |
| Tailwind CSS 3  | 样式系统               |
| GSAP            | 滚动动画与视觉动效     |
| Three.js        | 3D 地球仪渲染          |
| three-globe     | 地球仪数据可视化       |
| Lucide React    | 图标系统               |

## 快速开始

```bash
# 进入项目目录
cd app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

开发服务器默认运行在 `http://localhost:5173/`。

## 项目结构

```
山滨海经数字化展示/
├── app/                         # 前端应用
│   ├── public/                  # 静态资源
│   │   ├── images/              # 神兽图片
│   │   ├── textures/            # 地球仪纹理
│   │   └── videos/              # 视频资源
│   ├── src/                     # 源码
│   │   ├── components/          # 通用组件
│   │   ├── data/                # 数据文件
│   │   ├── hooks/               # 自定义 Hooks
│   │   ├── lib/                 # 工具库
│   │   ├── sections/            # 页面区域组件
│   │   ├── types/               # TypeScript 类型
│   │   ├── config.ts            # 可编辑配置
│   │   ├── App.tsx              # 主应用组件
│   │   └── main.tsx             # 入口文件
│   ├── package.json
│   └── vite.config.ts
├── docs/                        # 设计文档与规划
├── iterations/                  # 迭代复盘记录
└── README.md
```

## 自定义配置

所有内容可在 [`config.ts`](app/src/config.ts) 中编辑，包括站点信息、导航、神兽档案、展馆视频和页脚信息。

## 部署

```bash
cd app
npm run build
```

构建产物位于 `app/dist/` 目录，可直接部署至任何静态托管服务（Vercel、Netlify、GitHub Pages 等）需支持 SPA 回退到 `index.html`。
