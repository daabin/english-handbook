import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressState {
  completed: Record<string, string[]>
  markCompleted: (chapterId: string, expressionId: string) => void
  unmarkCompleted: (chapterId: string, expressionId: string) => void
  isCompleted: (chapterId: string, expressionId: string) => boolean
  getChapterProgress: (chapterId: string, total: number) => { done: number; total: number }
  getTotalCompleted: () => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      markCompleted: (chapterId, expressionId) => {
        set((state) => {
          const chapterCompleted = state.completed[chapterId] || []
          if (chapterCompleted.includes(expressionId)) return state
          return {
            completed: {
              ...state.completed,
              [chapterId]: [...chapterCompleted, expressionId],
            },
          }
        })
      },
      unmarkCompleted: (chapterId, expressionId) => {
        set((state) => {
          const chapterCompleted = state.completed[chapterId] || []
          return {
            completed: {
              ...state.completed,
              [chapterId]: chapterCompleted.filter((id) => id !== expressionId),
            },
          }
        })
      },
      isCompleted: (chapterId, expressionId) => {
        return (get().completed[chapterId] || []).includes(expressionId)
      },
      getChapterProgress: (chapterId, total) => {
        const done = (get().completed[chapterId] || []).length
        return { done, total }
      },
      getTotalCompleted: () => {
        const { completed } = get()
        return Object.values(completed).reduce((sum, ids) => sum + ids.length, 0)
      },
    }),
    { name: 'english-handbook-progress' },
  ),
)
