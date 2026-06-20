// app/src/components/AtlasPopup.tsx
import { useEffect } from 'react'
import type { MapPoint } from '../data/mapData'
import { X } from 'lucide-react'

interface AtlasPopupProps {
  point: MapPoint | null
  onClose: () => void
  onNavigate?: (slug: string) => void
}

export default function AtlasPopup({ point, onClose, onNavigate }: AtlasPopupProps) {
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
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
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
          animation: 'atlas-popup-in 0.25s ease-out',
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
        @keyframes atlas-popup-in {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
