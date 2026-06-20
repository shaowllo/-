# 山海经古图舆 — 交互地图设计

## 概述

在《山海经》数字档案馆中新增一个可交互的古风地图模块"舆图"，以 SVG 手绘风格呈现《山海经》中的山川水系、邦国异兽的地理分布。用户可以通过悬停、点击、筛选等方式探索这部上古地理志的奇幻世界。

## 页面位置

- 新 section ID: `atlas`
- 放置在现有 section 之间：**山川 → 舆图 (新) → 分布**
- 导航栏新增一项：`舆图`
- 理由：地理主题的自然延续，山川介绍之后直接展示地理可视化

## 视觉风格

### 整体美学
- 底色：`var(--parchment)` 仿古宣纸纹理（CSS 噪点纹理叠加）
- 字体：`var(--font-calligraphy)` 书法字体标注地名
- 色调：墨色主调 + 朱红点缀 + 金色高亮，与现有设计系统完全一致

### 地图元素样式

| 元素 | 视觉表现 | SVG 实现 |
|------|----------|----------|
| 🏔️ 山系区域 | 手绘墨色山形轮廓，半透明填充 | `<path>` 不规则的曲线围合区域 |
| 🌊 水系 | 墨青色蜿蜒线条，细虚线 | `<path>` 带 stroke-dasharray |
| 🐉 神兽标记 | 金色圆点 + 小篆字形 | `<circle>` + `<text>` |
| 🏛️ 古国/邦国 | 朱红印章式方形标记 | `<rect>` 带旋转 |
| 🌿 草木/物产 | 墨绿色圆点 | `<circle>` |
| 区域边界 | 金色细虚线，带传统云纹装饰 | `<path>` 虚线 |
| 文字标注 | 书法字体，半透明墨色 | `<text>` 带 font-family |

## 地图内容

### 地理范围
- 中央区域：南山经、西山经、北山经、东山经、中山经
- 外围区域：海外南/西/北/东经、大荒经、海内经
- 不追求真实地理精度，采用 **意象化的山海经世界观** 布局

### 标注点类型

| 类型 | 数量（初始） | 数据来源 |
|------|-------------|----------|
| 名山 | 15-20 座 | classicalTexts.ts 中的南山经、西山经、北山经章节 |
| 水系 | 8-10 条 | 同上 |
| 神兽栖息地 | 6 处 | exhibitionsConfig 中的 6 种神兽 |
| 古国邦国 | 6-8 个 | 新增 mapData.ts |
| 草木物产 | 6-8 处 | classicalTexts 中的祝余、迷榖等 |

### 详情弹窗内容
点击任意标注点弹出浮层，包含：
- 名称（书法字体）
- 出处（出自哪一卷）
- 简要描述（30-60 字）
- 关联链接（如果是神兽，链接到对应的展览详情）
- 关闭按钮

## 交互设计

### 三种交互层级

1. **悬停 Hover** — 标记点放大 1.3x，名称浮现（金色光晕），cursor 变为手型
2. **点击 Click** — 弹出详情浮层（`MapPopup` 组件），半透明遮罩背景
   - 浮层样式复用现有 `AnnotationPopup` 的设计语言
   - 有关联数据时可跳转到神兽详情页
3. **筛选 Filter** — 右上角图例筛选栏，点击切换显示的标注类型
   - 全部 | 山 | 水 | 兽 | 国
   - 选中项金色高亮，未选中的标记点半透明

### 动效
- **入口动画**：滚动到 section 时，SVG 地图从中心展开（scaleX 0→1，类似 Hongmeng）
- **标记点显现**：依次淡入（stagger 0.08s），每个点有轻微的弹跳效果
- **点击浮层**：fadeIn + scaleUp，背景遮罩 blur
- **筛选切换**：标记点以交叉淡入淡出过渡

## 技术架构

### 文件结构

```
src/
  data/
    mapData.ts              ← 新增：标注点坐标 + 详情数据
  components/
    AtlasMap.tsx            ← SVG 地图容器 + 缩放平移逻辑
    AtlasMarker.tsx         ← 单个标注点（SVG 元素）
    AtlasPopup.tsx          ← 点击弹窗
    AtlasFilter.tsx         ← 图例筛选栏
  sections/
    Atlas.tsx               ← 新的 section 组件
```

### 组件职责

**Atlas.tsx** (section)
- 引用 SectionHeader，标题为"舆图"
- 组合 AtlasFilter + AtlasMap + AtlasPopup
- 管理选中状态和筛选状态
- 使用 useScrollReveal 实现入口动画

**AtlasMap.tsx**
- 渲染 `<svg>` 根元素（viewBox 保持固定比例）
- 实现鼠标滚轮缩放 + 拖拽平移
- 渲染所有标注点（遍历 mapData）
- 子组件：AtlasMarker × N

**AtlasMarker.tsx**
- Props: `{ x, y, type, label, isActive, isFiltered, onClick }`
- 根据类型渲染不同形状（circle/path/rect）
- 悬停状态管理
- 使用 GSAP 处理显现动画

**AtlasPopup.tsx**
- Props: `{ data, onClose }`
- 与现有 AnnotationPopup 视觉风格统一
- 如果有关联神兽 slug，提供"查看详情"链接
- ESC 键或点击遮罩关闭

**AtlasFilter.tsx**
- Props: `{ activeFilters, onFilterChange }`
- 水平排列的标签按钮
- 与现有 ResourceQuery 的筛选栏风格一致

### 数据模型 (`mapData.ts`)

```typescript
export interface MapPoint {
  id: string
  name: string
  x: number        // SVG viewBox 坐标 (0-1000)
  y: number
  type: 'mountain' | 'river' | 'beast' | 'kingdom' | 'plant'
  region: string   // 所属山系/区域
  description: string
  source?: string  // 出处
  relatedSlug?: string  // 关联神兽 slug
}
```

### 与现有系统的关系
- 复用 `SectionHeader` 组件
- 复用 `useScrollReveal` hook
- 复用 `var(--gold-primary)`, `var(--imperial-red)` 等 CSS 变量
- `AtlasPopup` 视觉复用 `AnnotationPopup` 设计语言
- `AtlasFilter` 视觉复用 `ResourceQuery` 筛选栏设计

## 数据准备

### 初始标注点（基于现有数据）

**神兽栖息地（6处）：**
| 神兽 | 地点 | 坐标 (x, y) |
|------|------|-------------|
| 九尾狐 | 青丘之山 | (350, 420) |
| 凤凰 | 丹穴之山 | (480, 500) |
| 烛龙 | 章尾山 | (200, 150) |
| 饕餮 | 钩吾之山 | (550, 250) |
| 麒麟 | 海外 | (700, 300) |
| 白泽 | 昆仑山 | (300, 200) |

**主要山系（基于 classicalTexts 章节）：**
| 山名 | 所属经卷 | 坐标 |
|------|---------|------|
| 招摇之山 | 南山经 | (400, 450) |
| 杻阳之山 | 南山经 | (450, 430) |
| 堂庭之山 | 南山经 | (420, 470) |
| 钱来之山 | 西山经 | (350, 300) |
| 松果之山 | 西山经 | (330, 280) |
| 太华之山 | 西山经 | (300, 290) |
| 单狐之山 | 北山经 | (450, 180) |
| 求如之山 | 北山经 | (480, 160) |
| 青丘之山 | 南山经 | (350, 420) |
| 丹穴之山 | 西山经 | (480, 500) |

## 实现优先级

### Phase 1 (核心 MVP)
- [ ] Atlas.tsx section 骨架
- [ ] AtlasMap.tsx SVG 渲染 + 缩放平移
- [ ] AtlasMarker.tsx 标注点 + 悬停效果
- [ ] mapData.ts 基础数据（15-20 个点）
- [ ] 入口动画

### Phase 2 (交互完善)
- [ ] AtlasPopup.tsx 详情弹窗
- [ ] AtlasFilter.tsx 图例筛选
- [ ] 关联神兽详情跳转
- [ ] 筛选过渡动画

### Phase 3 (数据扩展)
- [ ] 扩充标注点到 30+
- [ ] 添加区域边界路径
- [ ] 添加装饰性云纹/水纹元素
- [ ] 移动端适配

## 超出范围（明确不做）
- 真实地理坐标映射（使用意象化布局而非真实 GIS 数据）
- 3D 地形/立体的地图（保持 2D SVG 古风）
- 用户标注/贡献功能
- 动画路径漫游引导
