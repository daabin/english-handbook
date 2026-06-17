import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ReadingMode = 'scroll' | 'card'

interface ReadingModeState {
  mode: ReadingMode
  setMode: (mode: ReadingMode) => void
  toggle: () => void
}

export const useReadingModeStore = create<ReadingModeState>()(
  persist(
    (set, get) => ({
      mode: 'card',
      setMode: (mode) => set({ mode }),
      toggle: () => set({ mode: get().mode === 'scroll' ? 'card' : 'scroll' }),
    }),
    { name: 'english-handbook-reading-mode' },
  ),
)
