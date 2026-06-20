interface SectionHeaderProps {
  title: string
  id?: string
}

/**
 * 统一的章节标题组件 — 金色竖线 + 书法字体标题
 * 在 MountainsChapter / WorldDistribution / ExhibitionIndex /
 * CinematicPavilions / AncientBookReader / ResourceQuery 中复用
 */
export default function SectionHeader({ title, id }: SectionHeaderProps) {
  return (
    <div
      id={id}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '4rem',
      }}
    >
      <div
        style={{
          width: '4px',
          height: 'clamp(2.5rem, 6vw, 4rem)',
          background: 'var(--gold-primary)',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />
      <h2
        style={{
          fontFamily: 'var(--font-calligraphy)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          color: 'var(--ink-black)',
          margin: 0,
          letterSpacing: '0.1em',
        }}
      >
        {title}
      </h2>
    </div>
  )
}