# 山海经古图舆 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有《山海经》数字档案馆中新增一个可交互的 SVG 古风地图模块

**Architecture:** 新增 5 个文件：一个 section 组件 (Atlas.tsx)、三个子组件 (AtlasMap, AtlasMarker, AtlasPopup, AtlasFilter)、一个数据文件 (mapData.ts)。所有新组件遵循现有设计系统（CSS 变量、SectionHeader、useScrollReveal hook），与项目现有模式完全一致。

**Tech Stack:** React 19, TypeScript, SVG, GSAP, CSS Variables

---

### Task 1: 地图标注点数据 — mapData.ts

**Files:**
- Create: `app/src/data/mapData.ts`

- [ ] **Step 1: 创建数据文件**

```typescript
// app/src/data/mapData.ts

export interface MapPoint {
  id: string
  name: string
  x: number        // SVG viewBox 坐标 (0-1000)
  y: number
  type: 'mountain' | 'river' | 'beast' | 'kingdom' | 'plant'
  region: string   // 所属山系/区域
  description: string
  source?: string  // 出处
  relatedSlug?: string  // 关联神兽 slug，用于跳转到 exhibition 详情
}

export const mapPoints: MapPoint[] = [
  // ===== 神兽栖息地 =====
  {
    id: 'beast-jiuwei',
    name: '九尾狐',
    x: 350, y: 420,
    type: 'beast',
    region: '南山经',
    description: '青丘之山有兽焉，其状如狐而九尾，其音如婴儿，能食人。',
    source: '《南山经》',
    relatedSlug: 'jiuwei-hu',
  },
  {
    id: 'beast-fenghuang',
    name: '凤凰',
    x: 480, y: 500,
    type: 'beast',
    region: '南山经',
    description: '丹穴之山有鸟焉，其状如鸡，五采而文，名曰凤皇。',
    source: '《南山经》',
    relatedSlug: 'fenghuang',
  },
  {
    id: 'beast-zhulong',
    name: '烛龙',
    x: 200, y: 150,
    type: 'beast',
    region: '海外经',
    description: '钟山之神，名曰烛阴，视为昼，瞑为夜，吹为冬，呼为夏。',
    source: '《海外北经》',
    relatedSlug: 'zhulong',
  },
  {
    id: 'beast-taotie',
    name: '饕餮',
    x: 550, y: 250,
    type: 'beast',
    region: '北山经',
    description: '钩吾之山有兽焉，其状如羊身人面，虎齿人爪，音如婴儿。',
    source: '《北山经》',
    relatedSlug: 'taotie',
  },
  {
    id: 'beast-qilin',
    name: '麒麟',
    x: 700, y: 300,
    type: 'beast',
    region: '海外经',
    description: '仁兽也，麋身牛尾，一角，角端有肉，设武备而不为害。',
    source: '《海外经》',
    relatedSlug: 'qilin',
  },
  {
    id: 'beast-baize',
    name: '白泽',
    x: 300, y: 200,
    type: 'beast',
    region: '海内经',
    description: '昆仑山上通灵神兽，通体雪白，能言，通晓天下鬼神之事。',
    source: '《海内经》',
    relatedSlug: 'baize',
  },

  // ===== 名山 =====
  {
    id: 'mt-zhaoyao',
    name: '招摇之山',
    x: 400, y: 450,
    type: 'mountain',
    region: '南山经',
    description: '南山经之首，临于西海之上，多桂，多金玉。',
    source: '《南山经》',
  },
  {
    id: 'mt-tangting',
    name: '堂庭之山',
    x: 420, y: 470,
    type: 'mountain',
    region: '南山经',
    description: '多棪木，多白猿，多水玉，多黄金。',
    source: '《南山经》',
  },
  {
    id: 'mt-chuyang',
    name: '杻阳之山',
    x: 450, y: 430,
    type: 'mountain',
    region: '南山经',
    description: '其阳多赤金，其阴多白金。有兽焉，名曰鹿蜀。',
    source: '《南山经》',
  },
  {
    id: 'mt-qianlai',
    name: '钱来之山',
    x: 350, y: 300,
    type: 'mountain',
    region: '西山经',
    description: '西山经华山之首，其上多松，其下多洗石。',
    source: '《西山经》',
  },
  {
    id: 'mt-songguo',
    name: '松果之山',
    x: 330, y: 280,
    type: 'mountain',
    region: '西山经',
    description: '濩水出焉，北流注于渭，其中多铜。',
    source: '《西山经》',
  },
  {
    id: 'mt-taihua',
    name: '太华之山',
    x: 300, y: 290,
    type: 'mountain',
    region: '西山经',
    description: '削成而四方，其高五千仞，其广十里，鸟兽莫居。',
    source: '《西山经》',
  },
  {
    id: 'mt-danxue',
    name: '丹穴之山',
    x: 480, y: 500,
    type: 'mountain',
    region: '南山经',
    description: '其上多金玉，丹水出焉。有鸟焉，名曰凤皇。',
    source: '《南山经》',
  },
  {
    id: 'mt-danhu',
    name: '单狐之山',
    x: 450, y: 180,
    type: 'mountain',
    region: '北山经',
    description: '北山经之首，多机木，其上多华草。',
    source: '《北山经》',
  },
  {
    id: 'mt-qiuru',
    name: '求如之山',
    x: 480, y: 160,
    type: 'mountain',
    region: '北山经',
    description: '其上多铜，其下多玉，无草木。',
    source: '《北山经》',
  },
  {
    id: 'mt-qingqiu',
    name: '青丘之山',
    x: 350, y: 420,
    type: 'mountain',
    region: '南山经',
    description: '其阳多玉，其阴多青䴔。有兽焉，其状如狐而九尾。',
    source: '《南山经》',
  },
  {
    id: 'mt-kunlun',
    name: '昆仑山',
    x: 300, y: 200,
    type: 'mountain',
    region: '海内经',
    description: '帝之下都，万神所在。赤水出焉，白泽居之。',
    source: '《海内经》',
  },
  {
    id: 'mt-zhangwei',
    name: '章尾山',
    x: 200, y: 150,
    type: 'mountain',
    region: '海外经',
    description: '西北海之外，赤水之北。有神人面蛇身，名曰烛龙。',
    source: '《海外北经》',
  },

  // ===== 古国邦国 =====
  {
    id: 'kg-wuqi',
    name: '无启国',
    x: 150, y: 350,
    type: 'kingdom',
    region: '海外经',
    description: '无启国在长股东，其人无嗣，食土，死复生。',
    source: '《海外北经》',
  },
  {
    id: 'kg-daren',
    name: '大人国',
    x: 750, y: 200,
    type: 'kingdom',
    region: '海外经',
    description: '大人国在海中，为人大，坐而削船。',
    source: '《海外东经》',
  },
  {
    id: 'kg-junzi',
    name: '君子国',
    x: 800, y: 350,
    type: 'kingdom',
    region: '海外经',
    description: '君子国在其北，衣冠带剑，食兽，使二大虎在旁。',
    source: '《海外东经》',
  },
  {
    id: 'kg-nvchou',
    name: '女子国',
    x: 200, y: 500,
    type: 'kingdom',
    region: '海外经',
    description: '女子国在巫咸北，两女子居，水周之。',
    source: '《海外西经》',
  },
  {
    id: 'kg-sanyao',
    name: '三苗国',
    x: 600, y: 400,
    type: 'kingdom',
    region: '海外经',
    description: '三苗国在赤水东，其为人相随。',
    source: '《海外南经》',
  },

  // ===== 水系 =====
  {
    id: 'riv-liji',
    name: '丽麂之水',
    x: 400, y: 480,
    type: 'river',
    region: '南山经',
    description: '出招摇之山，西流注于海。',
    source: '《南山经》',
  },
  {
    id: 'riv-guai',
    name: '怪水',
    x: 450, y: 440,
    type: 'river',
    region: '南山经',
    description: '出杻阳之山，东流注于宪翼之水。',
    source: '《南山经》',
  },
  {
    id: 'riv-huoshui',
    name: '濩水',
    x: 330, y: 285,
    type: 'river',
    region: '西山经',
    description: '出松果之山，北流注于渭。',
    source: '《西山经》',
  },
  {
    id: 'riv-danshui',
    name: '丹水',
    x: 480, y: 510,
    type: 'river',
    region: '南山经',
    description: '出丹穴之山，南流注于渤海。',
    source: '《南山经》',
  },
  {
    id: 'riv-chishui',
    name: '赤水',
    x: 300, y: 210,
    type: 'river',
    region: '海内经',
    description: '出昆仑之墟，东南流注于氾天之水。',
    source: '《海内经》',
  },
];

// 分类筛选选项
export const MAP_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'mountain', label: '山' },
  { key: 'river', label: '水' },
  { key: 'beast', label: '兽' },
  { key: 'kingdom', label: '国' },
] as const;

export type MapFilterKey = (typeof MAP_FILTERS)[number]['key'];
```

- [ ] **Step 2: 验证无类型错误**

Run: `node app/node_modules/typescript/bin/tsc --noEmit --project app/tsconfig.json`
Expected: exit 0

---

### Task 2: AtlasMarker 组件 — 单个标注点

**Files:**
- Create: `app/src/components/AtlasMarker.tsx`

- [ ] **Step 1: 创建 AtlasMarker 组件**

```typescript
// app/src/components/AtlasMarker.tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import type { MapPoint } from '../data/mapData'

interface AtlasMarkerProps {
  point: MapPoint
  isActive: boolean
  isVisible: boolean
  onClick: (point: MapPoint) => void
  onHover: (point: MapPoint | null) => void
}

export default function AtlasMarker({ point, isActive, isVisible, onClick, onHover }: AtlasMarkerProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const labelRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: isVisible ? 1 : 0.3,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: circleRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }, [isVisible])

  const getColor = () => {
    switch (point.type) {
      case 'mountain': return '#4A4A4A'       // ink-grey
      case 'river':    return '#5C7A7A'        // teal-ish
      case 'beast':    return '#C9A96E'        // gold-primary
      case 'kingdom':  return '#8B1A1A'        // imperial-red
      case 'plant':    return '#6B8E6B'        // green
    }
  }

  const getSize = () => {
    switch (point.type) {
      case 'beast':   return 8
      case 'mountain': return 6
      case 'kingdom':  return 10
      default:         return 5
    }
  }

  return (
    <g
      style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
      opacity={isVisible ? 1 : 0.2}
      onClick={() => onClick(point)}
      onMouseEnter={() => onHover(point)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 外圈光晕（激活时显示） */}
      {isActive && (
        <circle
          cx={point.x}
          cy={point.y}
          r={getSize() + 6}
          fill="none"
          stroke={getColor()}
          strokeWidth={1.5}
          opacity={0.4}
        >
          <animate
            attributeName="r"
            values={`${getSize() + 4};${getSize() + 10};${getSize() + 4}`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* 标记点主体 */}
      {point.type === 'kingdom' ? (
        <rect
          ref={circleRef as any}
          x={point.x - getSize() / 2}
          y={point.y - getSize() / 2}
          width={getSize()}
          height={getSize()}
          fill={getColor()}
          rx={2}
          transform={`rotate(45, ${point.x}, ${point.y})`}
        />
      ) : (
        <circle
          ref={circleRef}
          cx={point.x}
          cy={point.y}
          r={getSize()}
          fill={getColor()}
          stroke="var(--ivory)"
          strokeWidth={1.5}
        />
      )}

      {/* 名称标签（悬停/激活时显示） */}
      <text
        ref={labelRef}
        x={point.x}
        y={point.y - getSize() - 8}
        textAnchor="middle"
        fill={getColor()}
        fontFamily="var(--font-calligraphy)"
        fontSize={point.type === 'beast' ? 13 : 11}
        opacity={isActive ? 1 : 0}
        style={{ transition: 'opacity 0.2s ease', pointerEvents: 'none' }}
      >
        {point.name}
      </text>
    </g>
  )
}
```

- [ ] **Step 2: 验证通过**

```bash
node app/node_modules/typescript/bin/tsc --noEmit --project app/tsconfig.json
```

---

### Task 3: AtlasPopup 组件 — 点击详情弹窗

**Files:**
- Create: `app/src/components/AtlasPopup.tsx`

- [ ] **Step 1: 创建 AtlasPopup 组件**

```typescript
// app/src/components/AtlasPopup.tsx
import { useEffect, useRef } from 'react'
import type { MapPoint } from '../data/mapData'
import { X } from 'lucide-react'

interface AtlasPopupProps {
  point: MapPoint | null
  onClose: () => void
  onNavigate?: (slug: string) => void
}

export default function AtlasPopup({ point, onClose, onNavigate }: AtlasPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (point) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [point, onClose])

  if (!point) return null

  const typeLabel: Record<string, string> = {
    mountain: '山',
    river: '水',
    beast: '兽',
    kingdom: '国',
    plant: '草木',
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '420px',
          background: 'var(--ivory)',
          border: '2px solid var(--gold-primary)',
          borderRadius: '4px',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          animation: 'popup-in 0.25s ease-out',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink-grey)',
            padding: '4px',
          }}
        >
          <X size={18} />
        </button>

        {/* 类型标签 */}
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold-primary)',
          }}
        >
          {point.region} · {typeLabel[point.type] || point.type}
        </span>

        {/* 名称 */}
        <h3
          style={{
            fontFamily: 'var(--font-calligraphy)',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: 'var(--ink-black)',
            margin: '0.5rem 0 0.75rem 0',
            letterSpacing: '0.1em',
          }}
        >
          {point.name}
        </h3>

        {/* 分隔线 */}
        <div
          style={{
            width: '60px',
            height: '2px',
            background: 'var(--gold-primary)',
            marginBottom: '1rem',
          }}
        />

        {/* 描述 */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: 'var(--ink-black)',
            opacity: 0.75,
            margin: 0,
          }}
        >
          {point.description}
        </p>

        {/* 出处 */}
        {point.source && (
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ink-grey)',
              marginTop: '1rem',
              opacity: 0.6,
            }}
          >
            —— {point.source}
          </p>
        )}

        {/* 关联跳转 */}
        {point.relatedSlug && onNavigate && (
          <button
            onClick={() => { onNavigate(point.relatedSlug!); onClose() }}
            style={{
              marginTop: '1.25rem',
              padding: '0.5rem 1.25rem',
              background: 'var(--imperial-red)',
              color: 'var(--ivory)',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            查看神兽详情 →
          </button>
        )}
      </div>

      <style>{`
        @keyframes popup-in {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
```

---

### Task 4: AtlasFilter 组件 — 图例筛选栏

**Files:**
- Create: `app/src/components/AtlasFilter.tsx`

- [ ] **Step 1: 创建 AtlasFilter 组件**

```typescript
// app/src/components/AtlasFilter.tsx
import type { MapFilterKey } from '../data/mapData'

interface AtlasFilterProps {
  activeFilter: MapFilterKey
  onChange: (filter: MapFilterKey) => void
}

const FILTERS: { key: MapFilterKey; label: string; color: string }[] = [
  { key: 'all',      label: '全部', color: 'var(--ink-grey)' },
  { key: 'mountain', label: '山',   color: '#4A4A4A' },
  { key: 'river',    label: '水',   color: '#5C7A7A' },
  { key: 'beast',    label: '兽',   color: '#C9A96E' },
  { key: 'kingdom',  label: '国',   color: '#8B1A1A' },
]

export default function AtlasFilter({ activeFilter, onChange }: AtlasFilterProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}
    >
      {FILTERS.map((f) => {
        const isActive = activeFilter === f.key
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.9rem',
              background: isActive ? `${f.color}20` : 'transparent',
              border: `1px solid ${isActive ? f.color : 'rgba(201,169,110,0.3)'}`,
              color: isActive ? f.color : 'var(--ink-grey)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          >
            {/* 色点 */}
            {f.key !== 'all' && (
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: f.color,
                  display: 'inline-block',
                }}
              />
            )}
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
```

---

### Task 5: AtlasMap 组件 — SVG 地图容器

**Files:**
- Create: `app/src/components/AtlasMap.tsx`

- [ ] **Step 1: 创建 AtlasMap 组件**

```typescript
// app/src/components/AtlasMap.tsx
import { useState, useRef, useCallback } from 'react'
import type { MapPoint, MapFilterKey } from '../data/mapData'
import { mapPoints } from '../data/mapData'
import AtlasMarker from './AtlasMarker'
import AtlasPopup from './AtlasPopup'
import AtlasFilter from './AtlasFilter'

interface AtlasMapProps {
  onNavigateToExhibition?: (slug: string) => void
}

export default function AtlasMap({ onNavigateToExhibition }: AtlasMapProps) {
  const [activeFilter, setActiveFilter] = useState<MapFilterKey>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [popupPoint, setPopupPoint] = useState<MapPoint | null>(null)

  const filteredPoints = mapPoints.filter(
    (p) => activeFilter === 'all' || p.type === activeFilter
  )

  const panRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const [transform, setTransform] = useState('translate(0,0)')
  const [scale, setScale] = useState(1)

  // 拖拽平移
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('g')) return // 不干扰标记点击
    isDragging.current = true
    startPos.current = { x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    panRef.current = {
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    }
    setTransform(`translate(${panRef.current.x},${panRef.current.y})`)
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale((prev) => Math.max(0.6, Math.min(2.5, prev - e.deltaY * 0.001)))
  }, [])

  // 点击标记
  const handleMarkerClick = useCallback((point: MapPoint) => {
    setPopupPoint(point)
  }, [])

  // 跳转到神兽详情
  const handleNavigate = useCallback((slug: string) => {
    if (onNavigateToExhibition) {
      onNavigateToExhibition(slug)
    } else {
      window.history.pushState({}, '', `/exhibitions/${slug}`)
      window.scrollTo({ top: 0, behavior: 'auto' })
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }, [onNavigateToExhibition])

  return (
    <div style={{ position: 'relative' }}>
      <AtlasFilter activeFilter={activeFilter} onChange={setActiveFilter} />

      {/* SVG 地图 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          background: 'var(--parchment)',
          border: '1px solid var(--gold-muted)',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* 宣纸纹理 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />

        <svg
          viewBox="0 0 1000 750"
          style={{
            width: '100%',
            height: '100%',
            transform: `${transform} scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.05s linear',
          }}
        >
          {/* 背景区域划分 — 五大山系区域轮廓 */}
          {/* 南山经区域 */}
          <path
            d="M 300,380 Q 400,370 500,390 Q 580,400 550,480 Q 500,550 380,530 Q 280,510 300,380 Z"
            fill="rgba(74,74,74,0.04)"
            stroke="rgba(74,74,74,0.12)"
            strokeWidth={1}
            strokeDasharray="4,4"
          />

          {/* 西山经区域 */}
          <path
            d="M 200,170 Q 280,180 350,200 Q 400,280 380,350 Q 300,370 220,340 Q 160,280 200,170 Z"
            fill="rgba(74,74,74,0.04)"
            stroke="rgba(74,74,74,0.12)"
            strokeWidth={1}
            strokeDasharray="4,4"
          />

          {/* 北山经区域 */}
          <path
            d="M 350,50 Q 420,60 500,70 Q 550,120 530,180 Q 480,200 420,190 Q 360,170 350,50 Z"
            fill="rgba(74,74,74,0.04)"
            stroke="rgba(74,74,74,0.12)"
            strokeWidth={1}
            strokeDasharray="4,4"
          />

          {/* 东/中山经区域 */}
          <path
            d="M 550,200 Q 620,220 650,300 Q 660,380 600,420 Q 520,400 500,320 Q 500,240 550,200 Z"
            fill="rgba(74,74,74,0.03)"
            stroke="rgba(74,74,74,0.10)"
            strokeWidth={1}
            strokeDasharray="4,4"
          />

          {/* 区域标注 */}
          <text x="340" y="460" fill="rgba(74,74,74,0.2)" fontFamily="var(--font-calligraphy)" fontSize={18} textAnchor="middle">南山经</text>
          <text x="270" y="280" fill="rgba(74,74,74,0.2)" fontFamily="var(--font-calligraphy)" fontSize={18} textAnchor="middle">西山经</text>
          <text x="450" y="130" fill="rgba(74,74,74,0.2)" fontFamily="var(--font-calligraphy)" fontSize={18} textAnchor="middle">北山经</text>
          <text x="580" y="310" fill="rgba(74,74,74,0.2)" fontFamily="var(--font-calligraphy)" fontSize={16} textAnchor="middle">东山经</text>
          <text x="100" y="100" fill="rgba(74,74,74,0.15)" fontFamily="var(--font-calligraphy)" fontSize={22} textAnchor="middle">大荒</text>
          <text x="850" y="600" fill="rgba(74,74,74,0.15)" fontFamily="var(--font-calligraphy)" fontSize={22} textAnchor="middle">海外</text>

          {/* 所有标注点 */}
          {filteredPoints.map((point) => (
            <AtlasMarker
              key={point.id}
              point={point}
              isActive={hoveredId === point.id || popupPoint?.id === point.id}
              isVisible={true}
              onClick={handleMarkerClick}
              onHover={(p) => setHoveredId(p?.id ?? null)}
            />
          ))}
        </svg>

        {/* 缩放控件 */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.25rem',
            flexDirection: 'column',
          }}
        >
          <button
            onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
            style={{
              width: '32px', height: '32px',
              background: 'var(--ivory)',
              border: '1px solid var(--gold-muted)',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '1.2rem',
              color: 'var(--ink-grey)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
          <button
            onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
            style={{
              width: '32px', height: '32px',
              background: 'var(--ivory)',
              border: '1px solid var(--gold-muted)',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '1.2rem',
              color: 'var(--ink-grey)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </button>
          <button
            onClick={() => { setScale(1); panRef.current = { x: 0, y: 0 }; setTransform('translate(0,0)') }}
            style={{
              width: '32px', height: '28px',
              background: 'var(--ivory)',
              border: '1px solid var(--gold-muted)',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: 'var(--ink-grey)',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '0.25rem',
            }}
          >
            重置
          </button>
        </div>
      </div>

      {/* 详情弹窗 */}
      <AtlasPopup
        point={popupPoint}
        onClose={() => setPopupPoint(null)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
```

---

### Task 6: Atlas Section — 新 section 组件

**Files:**
- Create: `app/src/sections/Atlas.tsx`
- Modify: `app/src/App.tsx`
- Modify: `app/src/components/ScrollNav.tsx`

- [ ] **Step 1: 创建 Atlas.tsx section**

```typescript
// app/src/sections/Atlas.tsx
import { useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AtlasMap from '../components/AtlasMap'

interface AtlasProps {
  onNavigateToExhibition?: (slug: string) => void
}

export default function Atlas({ onNavigateToExhibition }: AtlasProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useScrollReveal(contentRef, { y: 40, duration: 1 })

  return (
    <section
      id="atlas"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        padding: 'var(--space-section) 4vw',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <SectionHeader title="舆图" />

      <div
        ref={contentRef}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: 'var(--ink-light)',
            letterSpacing: '0.05em',
            marginBottom: '2rem',
            lineHeight: 1.7,
          }}
        >
          拖拽平移 · 滚轮缩放 · 点击标注点查看详情
        </p>

        <AtlasMap onNavigateToExhibition={onNavigateToExhibition} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 在 App.tsx 中注册 Atlas section**

编辑 `app/src/App.tsx`，在 lazy import 区域添加：

```typescript
const Atlas = lazy(() => import('./sections/Atlas'));
```

在 return 的 JSX 中，在 MountainsChapter 和 WorldDistribution 之间添加：

```tsx
      <Suspense fallback={<SectionFallback />}>
        <Atlas onNavigateToExhibition={navigateToExhibition} />
      </Suspense>
```

- [ ] **Step 3: 在 ScrollNav.tsx 中注册导航项**

编辑 `app/src/components/ScrollNav.tsx`，在 `chapters` 数组中插入：

```typescript
  { id: 'atlas', label: '舆图' },
```

放在 `{ id: 'shanchuan', label: '山川' }` 之后。

- [ ] **Step 4: 验证编译**

```bash
node app/node_modules/typescript/bin/tsc --noEmit --project app/tsconfig.json
```
Expected: exit 0

---

### Task 7: 完整验证

- [ ] **Step 1: 类型检查**

```bash
node app/node_modules/typescript/bin/tsc --noEmit --project app/tsconfig.json
```

- [ ] **Step 2: 生产构建**

```bash
npm --prefix app run build
```

Expected: exit 0，新产出 `atlas` 相关 chunk

- [ ] **Step 3: 启动 dev server 确认**

```bash
npm --prefix app run dev
```
Expected: 启动无错误，访问页面后滚动到"舆图" section 可看到地图
