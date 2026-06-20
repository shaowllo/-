import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';
import { audioManager } from '../lib/audioManager';

gsap.registerPlugin(ScrollTrigger);

// 《山海经·南山经》原文与译注
const bookPages = [
  {
    left: {
      title: "南山经",
      content: "南山经之首曰鹊山。其首曰招摇之山，临于西海之上，多桂，多金玉。有草焉，其状如韭而青华，其名曰祝余，食之不饥。",
      annotation: "【译注】南山经的首座山叫鹊山。它的第一座峰叫招摇山，耸立在西海岸边，山上长满了桂树，蕴藏丰富的金矿石和玉石。有一种草，形似韭菜而开青色花，名叫祝余，吃了不会饥饿。"
    },
    right: {
      title: "招摇之山",
      content: "有木焉，其状如榖而黑理，其华四照，其名曰迷榖，佩之不迷。有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。",
      annotation: "【译注】有一种树，形似构树而有黑色纹理，其花光芒四射，名叫迷榖，佩戴不会迷路。有一种兽，形似猿猴而白耳，能伏地行走，名叫狌狌，食之善于奔跑。"
    }
  },
  {
    left: {
      title: "鹿蜀与旋龟",
      content: "又东三百七十里曰杻阳之山。其阳多赤金，其阴多白金。有兽焉，其状如马而白首，其文如虎而赤尾，其音如谣，其名曰鹿蜀，佩之宜子孙。",
      annotation: "【译注】杻阳山南坡盛产赤金，北坡盛产白金。鹿蜀形似马而白头，身纹如虎，红尾，鸣声如歌谣，佩戴其毛皮有利子孙繁衍。"
    },
    right: {
      title: "青丘之山",
      content: "又东三百里曰青丘之山。其阳多玉，其阴多青䴔。有兽焉，其状如狐而九尾，其音如婴儿，能食人，食者不蛊。",
      annotation: "【译注】青丘山南坡多玉石，北坡多青色矿物。九尾狐是其最具代表性的神兽，声如婴儿啼哭，能食人，但人若食其肉则不会中蛊毒。"
    }
  },
  {
    left: {
      title: "凤凰于飞",
      content: "又东五百里曰丹穴之山，其上多金玉。丹水出焉，而南流注于渤海。有鸟焉，其状如鸡，五采而文，名曰凤皇。",
      annotation: "【译注】丹穴山金玉满堂，丹水发源于此南流入渤海。凤凰形似鸡而五彩斑斓，首纹为德、翼纹为义、背纹为礼、膺纹为仁、腹纹为信。"
    },
    right: {
      title: "凤皇之德",
      content: "是鸟也，饮食自然，自歌自舞，见则天下安宁。有兽焉，其状如豚，有距，其音如狗吠，见则天下大穰，其名曰狸力。",
      annotation: "【译注】凤凰饮食自如，自歌自舞，是天下太平的祥瑞之兆。狸力形似猪而有鸡距，声如狗吠，出现则预示天下大丰收。"
    }
  },
  {
    left: {
      title: "山海经·西山经",
      content: "西山经华山之首曰钱来之山，其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。",
      annotation: "【译注】西山经以华山为起点，钱来山上多松树。羬羊形似羊而长马尾，其油脂可用来滋润干裂的皮肤，是上古时期的天然护肤品。"
    },
    right: {
      title: "松果之山",
      content: "又西四十五里曰松果之山，濩水出焉，北流注于渭。其中多铜，有鸟焉，其名曰螐渠，其状如山鸡，黑身赤足，可以已暴。",
      annotation: "【译注】松果山是濩水的发源地，北流入渭河。山中铜矿丰富。螐渠形似山鸡，黑身红足，据说可以治疗皮肤皴裂之病。"
    }
  },
  {
    left: {
      title: "锺山之神",
      content: "西北海之外，赤水之北，有章尾山。有神人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明，不食不寝不息。",
      annotation: "【译注】章尾山位于西北海之外、赤水之北。烛龙神人面蛇身，全身赤红。它闭眼即为黑夜，睁眼即为白昼，不吃不睡不呼吸，是掌控时间的创世之神。"
    },
    right:      {
      title: "烛九阴",
      content: "风雨是谒。是烛九阴，是谓烛龙。其为物，人面蛇身赤色，居钟山下。视为昼，瞑为夜，吹为冬，呼为夏，身长千里。",
      annotation: "【译注】烛龙居于钟山之下，身长千里。它睁眼为白昼，闭眼为黑夜，吹气为冬，呼气为夏。烛九阴即照亮九幽之底，是上古神话中最具神性的存在。"
    }
  }
];

export default function AncientBookReader() {
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const totalSpreads = bookPages.length;

  const openBook = useCallback(() => {
    setShowCover(false);
  }, []);

  const nextPage = useCallback(() => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return;
    setIsFlipping(true);
    audioManager.play('pageFlip');
    setCurrentSpread(prev => prev + 1);
    setTimeout(() => setIsFlipping(false), 800);
  }, [currentSpread, isFlipping, totalSpreads]);

  const prevPage = useCallback(() => {
    if (isFlipping || currentSpread <= 0) return;
    setIsFlipping(true);
    audioManager.play('pageFlip');
    setCurrentSpread(prev => prev - 1);
    setTimeout(() => setIsFlipping(false), 800);
  }, [currentSpread, isFlipping]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              section.querySelectorAll('.book-animate-in'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const currentPage = bookPages[currentSpread];

  return (
    <section
      id="herbs"
      ref={sectionRef}
      style={{
        background: 'var(--ivory)',
        padding: '8rem 4vw',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(201, 169, 110, 0.2)',
      }}
    >
      <SectionHeader title="草木" />

      {/* Section Header */}
      <div
        className="book-animate-in"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '4rem',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-grey)',
          }}
        >
          古籍阅览
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            color: 'var(--ink-grey)',
            letterSpacing: '0.05em',
          }}
        >
          左右键翻页 · {currentSpread + 1} / {totalSpreads}
        </span>
      </div>

      <div
        className="book-animate-in"
        ref={bookRef}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          opacity: 0,
          perspective: '2000px',
        }}
      >
        {/* Book Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            perspective: '2000px',
          }}
        >
          {showCover ? (
            /* Book Cover */
            <div
              onClick={openBook}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--imperial-red-dark) 0%, var(--imperial-red) 50%, var(--imperial-red-dark) 100%)',
                border: '2px solid var(--gold-primary)',
                borderRadius: '4px',
                cursor: 'none',
                boxShadow: '0 0 60px rgba(184, 134, 11, 0.15), inset 0 0 60px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              {/* Decorative border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  border: '1px solid rgba(201, 169, 110, 0.3)',
                  borderRadius: '2px',
                  pointerEvents: 'none',
                }}
              />
              {/* Corner ornaments */}
              {[[0, 0], [1, 0], [0, 1], [1, 1]].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    borderTop: pos[1] === 0 ? '2px solid var(--gold-primary)' : 'none',
                    borderBottom: pos[1] === 1 ? '2px solid var(--gold-primary)' : 'none',
                    borderLeft: pos[0] === 0 ? '2px solid var(--gold-primary)' : 'none',
                    borderRight: pos[0] === 1 ? '2px solid var(--gold-primary)' : 'none',
                    top: pos[1] === 0 ? '20px' : 'auto',
                    bottom: pos[1] === 1 ? '20px' : 'auto',
                    left: pos[0] === 0 ? '20px' : 'auto',
                    right: pos[0] === 1 ? '20px' : 'auto',
                    pointerEvents: 'none',
                  }}
                />
              ))}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.15em',
                  margin: 0,
                  textShadow: '0 0 30px rgba(184, 134, 11, 0.3)',
                }}
              >
                山海经
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.3em',
                  marginTop: '1rem',
                }}
              >
                点击开卷
              </p>
              <div
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-bright)',
                  opacity: 0.5,
                  letterSpacing: '0.1em',
                }}
              >
                先秦 · 佚名撰
              </div>
            </div>
          ) : (
            /* Open Book */
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Left Page */}
              <div
                style={{
                  flex: 1,
                  background: 'linear-gradient(to right, #e8e0d0, #f5f0e6)',
                  borderRight: '1px solid #c8b898',
                  padding: 'clamp(1.5rem, 3vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.1)',
                }}
              >
                {/* Paper texture overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,119,89,0.03) 2px, rgba(139,119,89,0.03) 4px)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Page number */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: '#8b7759',
                  }}
                >
                  {currentSpread * 2 + 1}
                </span>
                <PageContent page={currentPage.left} isLeft />
              </div>

              {/* Spine */}
              <div
                style={{
                  width: '4px',
                  background: 'linear-gradient(to right, #8b6914, #b8860b, #8b6914)',
                  boxShadow: '0 0 10px rgba(184, 134, 11, 0.3)',
                }}
              />

              {/* Right Page */}
              <div
                style={{
                  flex: 1,
                  background: 'linear-gradient(to left, #e8e0d0, #f5f0e6)',
                  borderLeft: '1px solid #c8b898',
                  padding: 'clamp(1.5rem, 3vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,119,89,0.03) 2px, rgba(139,119,89,0.03) 4px)',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: '#8b7759',
                  }}
                >
                  {currentSpread * 2 + 2}
                </span>
                <PageContent page={currentPage.right} isLeft={false} />
              </div>

              {/* Flip animation overlay */}
              {isFlipping && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.05)',
                    animation: 'pageFlip 0.8s ease-in-out',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {!showCover && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              marginTop: '2rem',
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentSpread === 0}
              style={{
                background: 'none',
                border: '1px solid var(--gold-primary)',
                color: 'var(--ink-black)',
                padding: '0.6rem 1.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                cursor: 'none',
                opacity: currentSpread === 0 ? 0.3 : 1,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (currentSpread > 0) {
                  (e.target as HTMLElement).style.background = 'rgba(201, 169, 110, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'none';
              }}
            >
              上一页
            </button>

            {/* Page dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {bookPages.map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (!isFlipping) {
                      setIsFlipping(true);
                      setCurrentSpread(i);
                      setTimeout(() => setIsFlipping(false), 800);
                    }
                  }}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === currentSpread ? 'var(--gold-primary)' : 'rgba(201, 169, 110, 0.25)',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentSpread >= totalSpreads - 1}
              style={{
                background: 'none',
                border: '1px solid var(--gold-primary)',
                color: 'var(--ink-black)',
                padding: '0.6rem 1.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                cursor: 'none',
                opacity: currentSpread >= totalSpreads - 1 ? 0.3 : 1,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (currentSpread < totalSpreads - 1) {
                  (e.target as HTMLElement).style.background = 'rgba(201, 169, 110, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'none';
              }}
            >
              下一页
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PageContent({ page, isLeft }: { page: { title: string; content: string; annotation: string }; isLeft: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Page Title */}
      <h4
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          fontWeight: 700,
          color: '#3a3020',
          margin: '0 0 1rem 0',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid rgba(139, 105, 20, 0.2)',
          letterSpacing: '0.05em',
        }}
      >
        {page.title}
      </h4>

      {/* Original Text */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.8rem, 1.3vw, 1rem)',
            lineHeight: 2,
            color: '#2a2018',
            margin: 0,
            textAlign: 'justify',
            letterSpacing: '0.05em',
          }}
        >
          {page.content}
        </p>

        {/* Annotation */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px dashed rgba(139, 105, 20, 0.15)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
              lineHeight: 1.8,
              color: '#6a5a40',
              margin: 0,
              textAlign: 'justify',
            }}
          >
            {page.annotation}
          </p>
        </div>
      </div>

      {/* Decorative seal */}
      <div
        style={{
          position: 'absolute',
          bottom: isLeft ? '2.5rem' : '2.5rem',
          right: isLeft ? '1rem' : 'auto',
          left: isLeft ? 'auto' : '1rem',
          width: '36px',
          height: '36px',
          border: '2px solid rgba(140, 59, 43, 0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(5deg)',
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            color: 'rgba(140, 59, 43, 0.5)',
            writingMode: 'vertical-rl',
          }}
        >
          山海
        </span>
      </div>
    </div>
  );
}
