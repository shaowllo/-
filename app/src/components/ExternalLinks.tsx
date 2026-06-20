import type { ExternalLink } from '../types/classical';
import { BookOpen, Library, Globe, Scroll, ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinksProps {
  links: ExternalLink[];
}

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5" />,
  Library: <Library className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Scroll: <Scroll className="w-5 h-5" />,
};

export default function ExternalLinks({ links }: ExternalLinksProps) {
  return (
    <div className="space-y-3">
      <h3
        className="text-lg font-bold flex items-center gap-2"
        style={{
          color: 'var(--color-royal-red)',
          fontFamily: '"Noto Serif SC", serif',
        }}
      >
        <ExternalLinkIcon className="w-5 h-5" style={{ color: 'var(--color-gold)' }} />
        延伸阅读
      </h3>

      <div className="grid gap-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-md"
            style={{
              backgroundColor: 'rgba(139, 0, 0, 0.04)',
              border: '1px solid rgba(201, 160, 80, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(139, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(201, 160, 80, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(139, 0, 0, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(201, 160, 80, 0.2)';
            }}
          >
            <div
              className="flex-shrink-0 p-2 rounded-full"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-ivory)',
              }}
            >
              {iconMap[link.icon] || <BookOpen className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="font-semibold text-sm"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {link.name}
                </span>
                <ExternalLinkIcon
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-gold)' }}
                />
              </div>
              <p
                className="text-xs mt-1 leading-relaxed"
                style={{ color: 'var(--color-ink)', opacity: 0.7 }}
              >
                {link.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
