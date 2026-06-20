// app/src/sections/Atlas.tsx
import { useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import AtlasMap from '../components/AtlasMap'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface AtlasProps {
  onNavigateToExhibition?: (slug: string) => void
}

export default function Atlas({ onNavigateToExhibition }: AtlasProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useScrollReveal(contentRef)

  return (
    <section
      id="atlas"
      ref={sectionRef}
      style={{
        background: 'var(--ivory)',
        padding: 'var(--space-section) 4vw',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: 0,
        }}
      >
        <SectionHeader title="舆图" />

        <div
          style={{
            marginBottom: '2rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-grey)',
          }}
        >
          上古地理 · 山海经世界观
        </div>

        <AtlasMap onNavigateToExhibition={onNavigateToExhibition} />
      </div>
    </section>
  )
}
