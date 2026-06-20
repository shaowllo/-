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
