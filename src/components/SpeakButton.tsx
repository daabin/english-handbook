import { useState, useCallback } from 'react'
import { useSpeechStore } from '../stores/speechStore'

interface Props {
  text: string
}

let currentUtterance: SpeechSynthesisUtterance | null = null

export function SpeakButton({ text }: Props) {
  const [playing, setPlaying] = useState(false)
  const rate = useSpeechStore((s) => s.rate)

  const speak = useCallback(() => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    if (currentUtterance) {
      currentUtterance.onend = null
      currentUtterance.onerror = null
      currentUtterance = null
    }
    if (playing) { setPlaying(false); return }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.pitch = 1

    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(
      (v) => v.lang.startsWith('en-US') && (v.name.includes('Google') || v.name.includes('Samantha')),
    ) || voices.find((v) => v.lang.startsWith('en-US'))
    if (preferred) utterance.voice = preferred

    currentUtterance = utterance
    utterance.onstart = () => setPlaying(true)
    utterance.onend = () => { setPlaying(false); currentUtterance = null }
    utterance.onerror = () => { setPlaying(false); currentUtterance = null }
    window.speechSynthesis.speak(utterance)
  }, [text, playing, rate])

  return (
    <button
      onClick={speak}
      className={`flex h-7 w-7 items-center justify-center shrink-0 transition-all duration-150 ${
        playing ? 'text-[#111111]' : 'text-[#9c9fa5] hover:text-[#111111]'
      }`}
      title="Listen"
    >
      {playing ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <rect x="2.5" y="2" width="2.5" height="8" rx="0.5" />
          <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M1.5 4.5h2l3-2.5v10l-3-2.5h-2a1 1 0 01-1-1v-3a1 1 0 011-1z" />
          <path d="M9.5 4.5a3 3 0 010 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M11.5 3a5.5 5.5 0 010 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
