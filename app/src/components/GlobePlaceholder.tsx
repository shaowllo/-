export default function GlobePlaceholder() {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 'clamp(260px, 80%, 420px)',
          height: 'clamp(260px, 80%, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, var(--imperial-red-dark), #1A0505 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(201, 169, 110, 0.2)',
            borderTopColor: 'var(--gold-primary)',
            animation: 'globe-placeholder-spin 1s linear infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '-40px',
            fontFamily: 'var(--font-calligraphy)',
            fontSize: '0.85rem',
            color: 'var(--gold-muted)',
            letterSpacing: '0.1em',
          }}
        >
          加载中...
        </span>
      </div>

      <style>{`
        @keyframes globe-placeholder-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
