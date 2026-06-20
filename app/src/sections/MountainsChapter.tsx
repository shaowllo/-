import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
}

function Counter({ target, suffix = '', label }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.value) + suffix;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [target, suffix, hasAnimated]);

  return (
    <div style={{ textAlign: 'center' }}>
      <span
        ref={ref}
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: 'var(--imperial-red)',
          lineHeight: 1.2,
        }}
      >
        0{suffix}
      </span>
      <span
        style={{
          display: 'block',
          marginTop: '0.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--ink-grey)',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function MountainsChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollReveal(contentRef);

  return (
    <section
      id="shanchuan"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        padding: 'var(--space-section) 4vw',
        position: 'relative',
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
        <SectionHeader title="山川" />

        {/* 左右两栏 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* 左侧：插画占位 */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              background: 'var(--ivory-warm)',
              border: '1px solid var(--gold-muted)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '20px',
                height: '20px',
                borderTop: '2px solid var(--gold-primary)',
                borderLeft: '2px solid var(--gold-primary)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '20px',
                height: '20px',
                borderTop: '2px solid var(--gold-primary)',
                borderRight: '2px solid var(--gold-primary)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                width: '20px',
                height: '20px',
                borderBottom: '2px solid var(--gold-primary)',
                borderLeft: '2px solid var(--gold-primary)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '20px',
                height: '20px',
                borderBottom: '2px solid var(--gold-primary)',
                borderRight: '2px solid var(--gold-primary)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-calligraphy)',
                fontSize: '1.2rem',
                color: 'var(--ink-light)',
                letterSpacing: '0.2em',
              }}
            >
              山川插画占位
            </span>
          </div>

          {/* 右侧：典籍介绍 */}
          <div style={{ paddingTop: '1rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                lineHeight: 1.8,
                color: 'var(--ink-grey)',
                margin: '0 0 2rem 0',
                textAlign: 'justify',
              }}
            >
              《山海经》全书共十八卷，分为《山经》五卷、《海经》八卷、《大荒经》四卷及《海内经》一卷。其中《山经》详载五百五十余座山峦之方位、物产、神祇与异兽，被誉为上古地理之百科全书。
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                lineHeight: 1.9,
                color: 'var(--ink-light)',
                margin: '0 0 3rem 0',
                textAlign: 'justify',
              }}
            >
              其文辞简古，意象瑰奇，记录了先秦时期华夏先民对山川河岳的认知与想象。每一座山、每一条水脉，皆承载着远古的神话记忆与地理探索，是中华文明最珍贵的自然志怪遗产。
            </p>

            {/* 数据计数器 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                padding: '2rem',
                background: 'var(--parchment)',
                border: '1px solid var(--gold-muted)',
                borderRadius: '4px',
                marginBottom: '3rem',
              }}
            >
              <Counter target={550} suffix="+" label="座山峦" />
              <Counter target={300} suffix="+" label="条水脉" />
              <Counter target={427} suffix="" label="种异兽" />
            </div>

            {/* 卷轴尺寸可视化 */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-calligraphy)',
                  fontSize: '1.1rem',
                  color: 'var(--ink-grey)',
                  margin: '0 0 1.25rem 0',
                  letterSpacing: '0.1em',
                }}
              >
                卷轴规模
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      width: '60px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-light)',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    山经
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'var(--ivory-warm)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: '28%',
                        height: '100%',
                        background: 'var(--imperial-red)',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      width: '40px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-grey)',
                      flexShrink: 0,
                    }}
                  >
                    5卷
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      width: '60px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-light)',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    海经
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'var(--ivory-warm)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: '44%',
                        height: '100%',
                        background: 'var(--gold-primary)',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      width: '40px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-grey)',
                      flexShrink: 0,
                    }}
                  >
                    8卷
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      width: '60px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-light)',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    大荒经
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'var(--ivory-warm)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: '22%',
                        height: '100%',
                        background: 'var(--gold-muted)',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      width: '40px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-grey)',
                      flexShrink: 0,
                    }}
                  >
                    4卷
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      width: '60px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-light)',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    海内经
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'var(--ivory-warm)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: '6%',
                        height: '100%',
                        background: 'var(--ink-light)',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      width: '40px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-grey)',
                      flexShrink: 0,
                    }}
                  >
                    1卷
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
