import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TextVariant = 'simplified' | 'traditional';
export type DisplayMode = 'horizontal' | 'vertical';

interface AppState {
  // 暗色模式
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;

  // 音效
  audioMuted: boolean;
  toggleAudio: () => void;
  setAudioMuted: (muted: boolean) => void;

  // 古籍阅读偏好
  textVariant: TextVariant;
  setTextVariant: (variant: TextVariant) => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 暗色模式 — 默认跟随系统
      darkMode: typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setDarkMode: (dark) => set({ darkMode: dark }),

      // 音效
      audioMuted: false,
      toggleAudio: () => set((s) => ({ audioMuted: !s.audioMuted })),
      setAudioMuted: (muted) => set({ audioMuted: muted }),

      // 古籍阅读偏好
      textVariant: 'simplified',
      setTextVariant: (variant) => set({ textVariant: variant }),
      displayMode: 'vertical',
      setDisplayMode: (mode) => set({ displayMode: mode }),
    }),
    {
      name: 'shanhaijing-preferences',
      partialize: (state) => ({
        darkMode: state.darkMode,
        audioMuted: state.audioMuted,
        textVariant: state.textVariant,
        displayMode: state.displayMode,
      }),
    }
  )
);
