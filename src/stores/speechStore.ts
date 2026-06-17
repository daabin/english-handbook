import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SpeechRate = 0.5 | 0.75 | 1

interface SpeechState {
  rate: SpeechRate
  setRate: (rate: SpeechRate) => void
}

export const useSpeechStore = create<SpeechState>()(
  persist(
    (set) => ({
      rate: 0.75,
      setRate: (rate: SpeechRate) => {
        // Cancel any active speech when rate changes
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel()
        }
        set({ rate })
      },
    }),
    { name: 'english-handbook-speech' },
  ),
)
