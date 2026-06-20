import { useRef, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);
import { useScrollReveal } from '../hooks/useScrollReveal';
import GlobePlaceholder from '../components/GlobePlaceholder';

const Globe = lazy(() => import('../components/Globe'));

interface DistributionCardProps {
  region: string;
  detail: string;
  description: string;
  delay?: number;
}

function DistributionCard({ region, detail, description, delay = 0 }: DistributionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay }
        );
      },
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      style={{
        background: 'var(--parchment)',
        border: '1px solid var(--gold-muted)',
        borderRadius: '4px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        opacity: 0,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--gold-primary)';
        el.style.boxShadow = '0 8px 30px rgba(201,169,110,0.12)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--gold-muted)';
        el.style.boxShadow = 'none';
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-calligraphy)',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
          color: 'var(--imperial-red)',
          margin: '0 0 0.5rem 0',
          letterSpacing: '0.1em',
        }}
      >
        {region}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--gold-primary)',
          margin: '0 0 0.75rem 0',
        }}
      >
        {detail}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          color: 'var(--ink-grey)',
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function WorldDistribution() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useScrollReveal(contentRef);
  useScrollReveal(textRef, { delay: 0.2 });

  return (
    <section
      id="fenbu"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        padding: 'var(--space-section) 4vw',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <SectionHeader title="分布" />

        {/* 左右两栏 */}
        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '4rem',
            opacity: 0,
          }}
        >
          {/* 左侧：旋转地球 */}
          <Suspense fallback={<GlobePlaceholder />}>
            <Globe />
          </Suspense>

          {/* 右侧：文字介绍 */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--ink-black)',
                margin: '0 0 1.5rem 0',
                lineHeight: 1.3,
              }}
            >
              《山海经》流传世界
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.8,
                color: 'var(--ink-grey)',
                margin: '0 0 1.5rem 0',
                textAlign: 'justify',
              }}
            >
              记录远古山川、异兽与邦国，跨越时空流传至四海八方。从东亚到欧美，这部上古奇书激发了无数学者与艺术家的想象。
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                lineHeight: 1.9,
                color: 'var(--ink-light)',
                margin: '0 0 2.5rem 0',
                textAlign: 'justify',
              }}
            >
              自汉代成书以来，《山海经》随丝绸之路东传日本，又经传教士之手西渐欧洲。如今，它已成为世界汉学研究的重要典籍，其瑰奇的想象力持续影响着全球的文化创作。
            </p>

            <a
              href="#beasts"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--imperial-red)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'gap 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.gap = '0.75rem';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.gap = '0.5rem';
              }}
            >
              了解更多
              <span style={{ transition: 'transform 0.3s ease' }}>→</span>
            </a>
          </div>
        </div>

        {/* 数据卡片 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          <DistributionCard
            region="中国"
            detail="18卷"
            description="《山经》《海经》《大荒经》《海内经》完整传承，历代注疏不绝"
            delay={0}
          />
          <DistributionCard
            region="日本"
            detail="传抄"
            description="奈良时代传入，影响日本妖怪文化与浮世绘艺术深远"
            delay={0.15}
          />
          <DistributionCard
            region="欧美"
            detail="译本"
            description="19世纪起法、英、德文译本相继问世，成为东方学研究热点"
            delay={0.3}
          />
        </div>
      </div>

      {/* 响应式：移动端改为单列 */}
      <style>{`
        @media (max-width: 768px) {
          #fenbu > div > div:nth-of-type(2) {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          #fenbu > div > div:nth-of-type(4) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
