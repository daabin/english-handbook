import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecentState {
  recentChapters: string[]
  visitChapter: (id: string) => void
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      recentChapters: [],
      visitChapter: (id) => {
        set((state) => {
          const filtered = state.recentChapters.filter((cid) => cid !== id)
          return { recentChapters: [id, ...filtered].slice(0, 5) }
        })
      },
    }),
    { name: 'english-handbook-recent' },
  ),
)
