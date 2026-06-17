import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FilterState {
  hideCompleted: boolean
  toggleHideCompleted: () => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      hideCompleted: false,
      toggleHideCompleted: () => set({ hideCompleted: !get().hideCompleted }),
    }),
    { name: 'english-handbook-filter' },
  ),
)
