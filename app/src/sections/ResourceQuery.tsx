import { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import SectionHeader from '../components/SectionHeader';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import { BookOpen, ScrollText } from 'lucide-react';

// 古籍数字资源数据库
interface Resource {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  category: string;
  description: string;
  tags: string[];
  pages: number;
  format: string;
  hasReader?: boolean;
}

const resources: Resource[] = [
  {
    id: "shanhaijing",
    title: "山海经",
    author: "佚名",
    dynasty: "先秦",
    category: "地理",
    description: "中国古代地理志怪典籍，记述山川、道里、民族、物产、药物、祭祀、巫医等内容，保存了大量远古神话传说。",
    tags: ["地理", "神话", "志怪", "先秦"],
    pages: 18,
    format: "图文对照",
    hasReader: true,
  },
  {
    id: "huainanzi",
    title: "淮南子",
    author: "刘安",
    dynasty: "西汉",
    category: "诸子",
    description: "西汉淮南王刘安及其门客集体编写的一部哲学著作，杂家代表，保存了女娲补天、后羿射日等著名神话。",
    tags: ["哲学", "神话", "杂家", "西汉"],
    pages: 21,
    format: "全文",
    hasReader: false,
  },
  {
    id: "shenyijing",
    title: "神异经",
    author: "东方朔",
    dynasty: "西汉",
    category: "志怪",
    description: "仿《山海经》体例撰写的志怪小说，记述八荒之中的异兽、异物、异人，文笔瑰丽，想象丰富。",
    tags: ["志怪", "神话", "异兽", "西汉"],
    pages: 8,
    format: "图文对照",
    hasReader: false,
  },
  {
    id: "bowuzhi",
    title: "博物志",
    author: "张华",
    dynasty: "西晋",
    category: "博物",
    description: "西晋张华编撰的志怪小说集，记录山川地理、飞禽走兽、人物传记、神话古史、神仙方术等。",
    tags: ["博物", "志怪", "地理", "西晋"],
    pages: 10,
    format: "全文",
    hasReader: false,
  },
  {
    id: "xijingzaji",
    title: "西京杂记",
    author: "刘歆",
    dynasty: "西汉",
    category: "笔记",
    description: "古代历史笔记小说集，记述西汉的杂史遗闻，内含许多神话传说与奇闻异事。",
    tags: ["笔记", "杂史", "神话", "西汉"],
    pages: 6,
    format: "全文",
    hasReader: false,
  },
  {
    id: "liezi",
    title: "列子",
    author: "列御寇",
    dynasty: "战国",
    category: "诸子",
    description: "道家经典之一，包含大量神话传说和寓言故事，如愚公移山、夸父追日、黄帝神游等。",
    tags: ["道家", "寓言", "神话", "战国"],
    pages: 8,
    format: "全文",
    hasReader: false,
  },
  {
    id: "chuci",
    title: "楚辞",
    author: "屈原等",
    dynasty: "战国",
    category: "诗文",
    description: "中国第一部浪漫主义诗歌总集，包含大量神话元素，如《天问》《九歌》等篇章。",
    tags: ["诗歌", "神话", "浪漫主义", "战国"],
    pages: 17,
    format: "注释版",
    hasReader: false,
  },
  {
    id: "yueling",
    title: "月令",
    author: "佚名",
    dynasty: "先秦",
    category: "礼制",
    description: "《礼记》中的一篇，记述每月的时令、物候及对应的祭祀活动，反映上古天文历法知识。",
    tags: ["礼制", "历法", "天文", "先秦"],
    pages: 4,
    format: "全文",
    hasReader: false,
  },
  {
    id: "shiji",
    title: "史记",
    author: "司马迁",
    dynasty: "西汉",
    category: "正史",
    description: "中国第一部纪传体通史，其中五帝本纪、封禅书等篇章保存了大量上古神话与传说。",
    tags: ["正史", "传记", "上古", "西汉"],
    pages: 130,
    format: "节选",
    hasReader: false,
  },
  {
    id: "mutianzizhuan",
    title: "穆天子传",
    author: "佚名",
    dynasty: "战国",
    category: "杂史",
    description: "记述周穆王西巡游历的故事，涉及西王母等神话人物，是研究上古神话的重要文献。",
    tags: ["杂史", "神话", "游记", "战国"],
    pages: 6,
    format: "全文",
    hasReader: false,
  },
  {
    id: "yiwenzhi",
    title: "汉书·艺文志",
    author: "班固",
    dynasty: "东汉",
    category: "目录",
    description: "中国现存最早的国家图书目录，著录了先秦至西汉的典籍，是研究古籍流传的重要文献。",
    tags: ["目录", "学术", "典籍", "东汉"],
    pages: 4,
    format: "全文",
    hasReader: false,
  },
  {
    id: "shuowen",
    title: "说文解字",
    author: "许慎",
    dynasty: "东汉",
    category: "小学",
    description: "中国第一部系统地分析汉字字形和考究字源的字书，保存了大量古文字和上古文化信息。",
    tags: ["文字", "小学", "训诂", "东汉"],
    pages: 15,
    format: "节选",
    hasReader: false,
  }
];

const categories = ["全部", "地理", "诸子", "志怪", "博物", "笔记", "诗文", "礼制", "正史", "杂史", "目录", "小学"];
const dynasties = ["全部", "先秦", "战国", "西汉", "东汉", "西晋"];

export default function ResourceQuery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeDynasty, setActiveDynasty] = useState('全部');

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        searchTerm === '' ||
        r.title.includes(searchTerm) ||
        r.author.includes(searchTerm) ||
        r.description.includes(searchTerm) ||
        r.tags.some((t) => t.includes(searchTerm));
      const matchesCategory = activeCategory === '全部' || r.category === activeCategory;
      const matchesDynasty = activeDynasty === '全部' || r.dynasty === activeDynasty;
      return matchesSearch && matchesCategory && matchesDynasty;
    });
  }, [searchTerm, activeCategory, activeDynasty]);

  useStaggerReveal(sectionRef, '.query-animate-in', {
    y: 30,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
    threshold: 0.1,
  });

  return (
    <section
      id="legacy"
      ref={sectionRef}
      style={{
        background: 'var(--ivory)',
        padding: '8rem 4vw',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(201, 169, 110, 0.2)',
      }}
    >
      <SectionHeader title="遗典" />

      {/* Section Header */}
      <div
        className="query-animate-in"
        style={{
          marginBottom: '3rem',
          opacity: 0,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
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
            数字资源
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--ink-grey)' }}>
            共 {filteredResources.length} 部典籍
          </span>
        </div>

        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            maxWidth: '600px',
            marginBottom: '2rem',
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索古籍名称、作者或关键词..."
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              paddingLeft: '3rem',
              background: 'var(--parchment)',
              border: '1px solid rgba(201, 169, 110, 0.4)',
              borderRadius: '2px',
              color: 'var(--ink-black)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              cursor: 'none',
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = 'var(--gold-primary)';
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(201, 169, 110, 0.4)';
            }}
          />
          {/* Search Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink-grey)"
            strokeWidth="2"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Filter Tags - Category */}
        <div style={{ marginBottom: '1rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: 'var(--ink-grey)',
              letterSpacing: '0.1em',
              marginRight: '1rem',
              textTransform: 'uppercase',
            }}
          >
            分类
          </span>
          <div style={{ display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.35rem 0.8rem',
                  background: activeCategory === cat ? 'rgba(201, 169, 110, 0.2)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'var(--gold-primary)' : 'rgba(201, 169, 110, 0.3)'}`,
                  color: activeCategory === cat ? 'var(--gold-primary)' : 'var(--ink-grey)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  borderRadius: '2px',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Tags - Dynasty */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: 'var(--ink-grey)',
              letterSpacing: '0.1em',
              marginRight: '1rem',
              textTransform: 'uppercase',
            }}
          >
            朝代
          </span>
          <div style={{ display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {dynasties.map((dyn) => (
              <button
                key={dyn}
                onClick={() => setActiveDynasty(dyn)}
                style={{
                  padding: '0.35rem 0.8rem',
                  background: activeDynasty === dyn ? 'rgba(201, 169, 110, 0.2)' : 'transparent',
                  border: `1px solid ${activeDynasty === dyn ? 'var(--gold-primary)' : 'rgba(201, 169, 110, 0.3)'}`,
                  color: activeDynasty === dyn ? 'var(--gold-primary)' : 'var(--ink-grey)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  borderRadius: '2px',
                }}
              >
                {dyn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {filteredResources.map((resource, index) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            index={index}
          />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: 'var(--ink-grey)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
          }}
        >
          未找到符合条件的古籍
        </div>
      )}
    </section>
  );
}

function ResourceCard({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resource.hasReader) {
      window.history.pushState({}, '', `/reader/${resource.id}`);
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div
      ref={cardRef}
      className="query-animate-in resource-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        opacity: 0,
        borderRadius: '4px',
      }}
    >
      {/* 卡片主体 - 宣纸纹理背景 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FAF6F0 0%, #F5F0E8 50%, #F0EBE0 100%)',
          border: '1px solid rgba(201, 169, 110, 0.35)',
          borderRadius: '4px',
          padding: '1.75rem',
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.borderColor = 'rgba(201, 169, 110, 0.7)';
          target.style.boxShadow = '0 8px 32px rgba(139, 0, 0, 0.08), 0 2px 8px rgba(201, 169, 110, 0.15)';
          target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.borderColor = 'rgba(201, 169, 110, 0.35)';
          target.style.boxShadow = 'none';
          target.style.transform = 'translateY(0)';
        }}
      >
        {/* 顶部装饰线 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '1.75rem',
            right: '1.75rem',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, var(--gold-primary) 30%, var(--gold-primary) 70%, transparent 100%)',
            opacity: 0.5,
          }}
        />

        {/* 头部区域：标题 + 朝代印章 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--ink-black)',
              margin: 0,
              letterSpacing: '0.08em',
              lineHeight: 1.3,
            }}
          >
            {resource.title}
          </h4>

          {/* 朝代印章 */}
          <div
            style={{
              flexShrink: 0,
              marginLeft: '0.75rem',
              padding: '0.3rem 0.6rem',
              background: 'rgba(139, 26, 26, 0.08)',
              border: '1px solid rgba(139, 26, 26, 0.2)',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--imperial-red)',
              letterSpacing: '0.08em',
              fontWeight: 500,
            }}
          >
            {resource.dynasty}
          </div>
        </div>

        {/* 作者与分类 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: 'var(--ink-grey)',
          }}
        >
          <span style={{ fontWeight: 500 }}>{resource.author} 撰</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{resource.category}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{resource.pages} 卷/篇</span>
        </div>

        {/* 简介 */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            color: 'var(--ink-black)',
            opacity: 0.65,
            margin: '0 0 1.25rem 0',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {resource.description}
        </p>

        {/* 标签 */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                color: 'var(--gold-muted)',
                padding: '0.25rem 0.6rem',
                background: 'rgba(201, 169, 110, 0.08)',
                borderRadius: '2px',
                letterSpacing: '0.03em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 底部操作栏 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(201, 169, 110, 0.2)',
          }}
        >
          {/* 格式标识 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--ink-grey)',
              opacity: 0.7,
            }}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>{resource.format}</span>
          </div>

          {/* 阅读按钮 - 所有卡片统一显示 */}
          {resource.hasReader ? (
            <button
              onClick={handleReadClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                background: 'var(--imperial-red)',
                color: 'var(--ivory)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '3px',
                transition: 'all 0.3s ease',
                cursor: 'none',
                letterSpacing: '0.03em',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.background = 'var(--imperial-red-dark)';
                target.style.transform = 'translateY(-1px)';
                target.style.boxShadow = '0 4px 12px rgba(139, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.background = 'var(--imperial-red)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              在线阅读
            </button>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                background: 'rgba(201, 169, 110, 0.1)',
                color: 'var(--gold-muted)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 500,
                borderRadius: '3px',
                letterSpacing: '0.03em',
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              即将上线
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
