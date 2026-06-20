import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import ScrollNav from './components/ScrollNav';
import Hongmeng from './sections/Hongmeng';
import ExhibitionDetail from './sections/ExhibitionDetail';
import CustomCursor from './components/CustomCursor';
import { siteConfig } from './config';
import { getExhibitionBySlug } from './lib/exhibitions';
import { audioManager } from './lib/audioManager';

// 非首屏 Section 全部懒加载 — 用户滚动时才下载代码
const MountainsChapter = lazy(() => import('./sections/MountainsChapter'));
const Atlas = lazy(() => import('./sections/Atlas'));
const WorldDistribution = lazy(() => import('./sections/WorldDistribution'));
const ExhibitionIndex = lazy(() => import('./sections/ExhibitionIndex'));
const CinematicPavilions = lazy(() => import('./sections/CinematicPavilions'));
const AncientBookReader = lazy(() => import('./sections/AncientBookReader'));
const ResourceQuery = lazy(() => import('./sections/ResourceQuery'));
const Footer = lazy(() => import('./sections/Footer'));
const ClassicalReader = lazy(() => import('./components/ClassicalReader'));

const SectionFallback = () => <div style={{ minHeight: '100vh', background: 'var(--ivory)' }} />;

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    // Enable smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor link clicks for smooth scroll
    const handleClick = (e: MouseEvent) => {
      // 初始化音效系统（需要用户手势）
      audioManager.init();
      
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  const activeExhibition = useMemo(() => {
    const match = pathname.match(/^\/exhibitions\/([^/]+)$/);
    if (!match) return null;
    return getExhibitionBySlug(match[1]);
  }, [pathname]);

  const navigateToExhibition = (slug: string) => {
    const nextPath = `/exhibitions/${slug}`;
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToArchive = () => {
    window.history.pushState({}, '', '/');
    setPathname('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (pathname.startsWith('/reader/')) {
    return (
      <>
        <CustomCursor />
        <Suspense
          fallback={
            <div
              className="min-h-screen flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-ivory)' }}
            >
              <div className="text-center space-y-4">
                <div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto"
                  style={{ borderColor: 'var(--color-royal-red)', borderTopColor: 'transparent' }}
                />
                <p style={{ color: 'var(--color-ink)' }}>正在加载古籍...</p>
              </div>
            </div>
          }
        >
          <ClassicalReader />
        </Suspense>
      </>
    );
  }

  if (pathname.startsWith('/exhibitions/') && activeExhibition) {
    return (
      <>
        <CustomCursor />
        <ExhibitionDetail exhibition={activeExhibition} onBack={navigateToArchive} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <ScrollNav />

      {/* 首屏 — 急切加载 */}
      <Hongmeng />

      {/* 以下 section 均为懒加载 — 滚动到附近时自动下载 */}
      <Suspense fallback={<SectionFallback />}>
        <MountainsChapter />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Atlas onNavigateToExhibition={navigateToExhibition} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WorldDistribution />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ExhibitionIndex onSelect={navigateToExhibition} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CinematicPavilions />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AncientBookReader />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ResourceQuery />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}