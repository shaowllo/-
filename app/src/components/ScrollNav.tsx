import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const chapters = [
  { id: 'hongmeng', label: '鸿蒙' },
  { id: 'shanchuan', label: '山川' },
  { id: 'atlas', label: '舆图' },
  { id: 'fenbu', label: '分布' },
  { id: 'beasts', label: '异兽' },
  { id: 'kingdoms', label: '邦国' },
  { id: 'herbs', label: '草木' },
  { id: 'legacy', label: '遗典' },
];

export default function ScrollNav() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const halfScreen = window.innerHeight * 0.5;
      setVisible(window.scrollY > halfScreen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [visible]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(chapter.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(245, 240, 232, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--gold-muted)',
        transform: 'translateY(-100%)',
        opacity: 0,
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 4vw',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--imperial-red)',
            letterSpacing: '0.1em',
          }}
        >
          山海经
        </span>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {chapters.map((chapter) => {
            const isActive = activeId === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => handleClick(chapter.id)}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0.25rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-calligraphy)',
                  letterSpacing: '0.15em',
                  color: isActive ? 'var(--gold-primary)' : 'var(--ink-grey)',
                  cursor: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = 'var(--imperial-red)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = 'var(--ink-grey)';
                  }
                }}
              >
                {chapter.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '10%',
                      width: '80%',
                      height: '2px',
                      background: 'var(--gold-primary)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
