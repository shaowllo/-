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

  // 拖拽平移
  const isDragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('g')) return
    isDragging.current = true
    startPos.current = { x: e.clientX - transform.x, y: e.clientY - transform.y }
  }, [transform])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    setTransform({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale((prev) => Math.max(0.6, Math.min(2.5, prev - e.deltaY * 0.001)))
  }, [])

  // 重置视图
  const handleReset = useCallback(() => {
    setTransform({ x: 0, y: 0 })
    setScale(1)
  }, [])

  const handleMarkerClick = useCallback((point: MapPoint) => {
    setPopupPoint(point)
  }, [])

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
          userSelect: 'none',
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
            display: 'block',
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* 背景区域 — 五大山系 */}
          <path
            d="M 300,380 Q 400,370 500,390 Q 580,400 550,480 Q 500,550 380,530 Q 280,510 300,380 Z"
            fill="rgba(74,74,74,0.04)" stroke="rgba(74,74,74,0.12)" strokeWidth={1} strokeDasharray="4,4"
          />
          <path
            d="M 200,170 Q 280,180 350,200 Q 400,280 380,350 Q 300,370 220,340 Q 160,280 200,170 Z"
            fill="rgba(74,74,74,0.04)" stroke="rgba(74,74,74,0.12)" strokeWidth={1} strokeDasharray="4,4"
          />
          <path
            d="M 350,50 Q 420,60 500,70 Q 550,120 530,180 Q 480,200 420,190 Q 360,170 350,50 Z"
            fill="rgba(74,74,74,0.04)" stroke="rgba(74,74,74,0.12)" strokeWidth={1} strokeDasharray="4,4"
          />
          <path
            d="M 550,200 Q 620,220 650,300 Q 660,380 600,420 Q 520,400 500,320 Q 500,240 550,200 Z"
            fill="rgba(74,74,74,0.03)" stroke="rgba(74,74,74,0.10)" strokeWidth={1} strokeDasharray="4,4"
          />

          {/* 区域文字标注 */}
          <text x="340" y="460" fill="rgba(74,74,74,0.18)" fontFamily="ZCOOL XiaoWei, Noto Serif SC, serif" fontSize={18} textAnchor="middle">南山经</text>
          <text x="270" y="280" fill="rgba(74,74,74,0.18)" fontFamily="ZCOOL XiaoWei, Noto Serif SC, serif" fontSize={18} textAnchor="middle">西山经</text>
          <text x="430" y="140" fill="rgba(74,74,74,0.18)" fontFamily="ZCOOL XiaoWei, Noto Serif SC, serif" fontSize={18} textAnchor="middle">北山经</text>
          <text x="600" y="320" fill="rgba(74,74,74,0.15)" fontFamily="ZCOOL XiaoWei, Noto Serif SC, serif" fontSize={16} textAnchor="middle">东/中山经</text>

          {/* 标注点 */}
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
      </div>

      {/* 图例提示 + 重置按钮 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.75rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          color: 'var(--ink-grey)',
        }}
      >
        <span>滚轮缩放 · 拖拽平移 · 点击查看详情</span>
        <button
          onClick={handleReset}
          style={{
            background: 'none',
            border: '1px solid rgba(201,169,110,0.3)',
            padding: '0.3rem 0.8rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            color: 'var(--ink-grey)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          重置视图
        </button>
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
