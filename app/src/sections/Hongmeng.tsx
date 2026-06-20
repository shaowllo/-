import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hongmeng() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (containerRef.current) {
        tl.fromTo(
          containerRef.current,
          { scaleX: 0.05, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.inOut' }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        );
      }

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (cueRef.current) {
        tl.fromTo(
          cueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hongmeng"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ivory)',
        position: 'relative',
        padding: '4rem 4vw',
      }}
    >
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--gold-muted), transparent)',
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '5%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--gold-muted), transparent)',
          opacity: 0.3,
        }}
      />

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          background: 'var(--parchment)',
          border: '2px solid var(--gold-primary)',
          borderRadius: '4px',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(2rem, 6vw, 4rem)',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08), inset 0 0 80px rgba(201,169,110,0.05)',
          opacity: 0,
          transformOrigin: 'center center',
        }}
      >
        {/* 四角装饰 */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '24px',
            height: '24px',
            borderTop: '2px solid var(--gold-primary)',
            borderLeft: '2px solid var(--gold-primary)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '24px',
            height: '24px',
            borderTop: '2px solid var(--gold-primary)',
            borderRight: '2px solid var(--gold-primary)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            width: '24px',
            height: '24px',
            borderBottom: '2px solid var(--gold-primary)',
            borderLeft: '2px solid var(--gold-primary)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '24px',
            height: '24px',
            borderBottom: '2px solid var(--gold-primary)',
            borderRight: '2px solid var(--gold-primary)',
          }}
        />

        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 900,
            color: 'var(--imperial-red)',
            letterSpacing: '0.15em',
            margin: 0,
            lineHeight: 1.2,
            opacity: 0,
          }}
        >
          山海经
        </h1>

        <div
          ref={lineRef}
          style={{
            width: '120px',
            height: '2px',
            background: 'var(--gold-primary)',
            margin: '1.5rem auto',
            opacity: 0,
            transformOrigin: 'center center',
          }}
        />

        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-calligraphy)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'var(--ink-grey)',
            letterSpacing: '0.2em',
            margin: 0,
            opacity: 0,
          }}
        >
          上古奇书 · 志怪地理之祖
        </p>

        <div
          ref={cueRef}
          style={{
            marginTop: '3rem',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--ink-light)',
              letterSpacing: '0.2em',
              marginBottom: '0.75rem',
            }}
          >
            向下展开卷轴
          </p>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--gold-primary), transparent)',
              margin: '0 auto',
              animation: 'scroll-down-bounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
