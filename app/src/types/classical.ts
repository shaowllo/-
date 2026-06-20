export interface WordAnnotation {
  id: string;
  word: string;
  pinyin: string;
  explanation: string;
  position: number;
}

export interface Chapter {
  id: string;
  title: string;
  traditionalTitle: string;
  content: string;
  traditionalContent: string;
  annotations: WordAnnotation[];
  imageUrl?: string;
  pageNumber: number;
}

export interface ExternalLink {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
}

export interface ClassicalText {
  id: string;
  title: string;
  traditionalTitle: string;
  author: string;
  dynasty: string;
  description: string;
  chapters: Chapter[];
  externalLinks: ExternalLink[];
  coverImage?: string;
}

export type DisplayMode = 'vertical' | 'horizontal';
export type TextVariant = 'simplified' | 'traditional';
