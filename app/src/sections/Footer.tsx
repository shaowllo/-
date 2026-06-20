import { footerConfig } from '../config';
import { useAppStore } from '../stores/appStore';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

export default function Footer() {
  const hasFooterContent =
    footerConfig.visitLabel ||
    footerConfig.visitLines.length > 0 ||
    footerConfig.connectLabel ||
    footerConfig.connectLinks.length > 0 ||
    footerConfig.brandName ||
    footerConfig.rightsText ||
    footerConfig.coordinatesText;

  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);
  const audioMuted = useAppStore((s) => s.audioMuted);
  const toggleAudio = useAppStore((s) => s.toggleAudio);

  if (!hasFooterContent) {
    return null;
  }

  return (
    <footer
      id="contact"
      style={{
        background: 'var(--ivory)',
        padding: '8rem 4vw 4rem',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(201, 169, 110, 0.3)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8rem',
        }}
      >
        {(footerConfig.visitLabel || footerConfig.visitLines.length > 0) && (
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-grey)',
                marginBottom: '1.5rem',
              }}
            >
              {footerConfig.visitLabel}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                color: 'var(--ink-black)',
                opacity: 0.7,
              }}
            >
              {footerConfig.visitLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < footerConfig.visitLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        )}

        {(footerConfig.connectLabel || footerConfig.connectLinks.length > 0) && (
          <div style={{ textAlign: 'right' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-grey)',
                marginBottom: '1.5rem',
              }}
            >
              {footerConfig.connectLabel}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                alignItems: 'flex-end',
              }}
            >
              {footerConfig.connectLinks.map((item) => (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--ink-black)',
                    opacity: 0.7,
                    textDecoration: 'none',
                    position: 'relative',
                    transition: 'color 0.3s ease, opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--gold-accent)';
                    (e.target as HTMLElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--ink-black)';
                    (e.target as HTMLElement).style.opacity = '0.7';
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 控制栏：暗色模式 + 音效 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '6rem',
        }}
      >
        <button
          onClick={toggleDarkMode}
          title={darkMode ? '切换亮色模式' : '切换暗色模式'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(201, 169, 110, 0.1)',
            border: '1px solid var(--gold-muted)',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'none',
            color: 'var(--ink-black)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            transition: 'background 0.2s ease',
          }}
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          {darkMode ? '亮色' : '暗色'}
        </button>
        <button
          onClick={toggleAudio}
          title={audioMuted ? '开启音效' : '关闭音效'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(201, 169, 110, 0.1)',
            border: '1px solid var(--gold-muted)',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'none',
            color: 'var(--ink-black)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            transition: 'background 0.2s ease',
          }}
        >
          {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          {audioMuted ? '静音' : '音效'}
        </button>
      </div>

      {footerConfig.brandName && (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 12rem)',
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            color: 'var(--ink-black)',
            opacity: 0.06,
            textWrap: 'balance',
          }}
        >
          {footerConfig.brandName}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(201, 169, 110, 0.3)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            color: 'var(--ink-grey)',
            letterSpacing: '0.05em',
          }}
        >
          {footerConfig.rightsText}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--ink-grey)',
          }}
        >
          {footerConfig.coordinatesText}
        </span>
      </div>
    </footer>
  );
}
