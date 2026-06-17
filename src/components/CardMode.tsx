import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Expression } from '../data/types'
import { ExpressionCard } from './ExpressionCard'

interface Props {
  expressions: Expression[]
}

type Dir = 1 | -1

const variants = {
  enter: (dir: Dir) => ({ x: dir > 0 ? 180 : -180, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: Dir) => ({ x: dir > 0 ? -180 : 180, opacity: 0 }),
}

const SWIPE_THRESHOLD = 80

export function CardMode({ expressions }: Props) {
  const [[page, dir], setPage] = useState([0, 1 as Dir])
  const containerRef = useRef<HTMLDivElement>(null)
  const total = expressions.length
  const exp = expressions[page]

  function setDir(d: Dir) {
    setPage(([p]) => [p + d, d])
  }

  const next = useCallback(() => { if (page < total - 1) setDir(1) }, [page, total])
  const prev = useCallback(() => { if (page > 0) setDir(-1) }, [page])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => { containerRef.current?.focus() }, [])

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next()
    if (info.offset.x > SWIPE_THRESHOLD) prev()
  }

  if (total === 0) return null

  return (
    <div ref={containerRef} tabIndex={-1} className="relative mx-auto max-w-[640px] px-4 sm:px-6 outline-none">
      {/* Progress dots */}
      <div className="flex items-center gap-1 mb-6">
        {expressions.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] flex-1 transition-all duration-300 ${
              i === page ? 'bg-[#111111]' : i < page ? 'bg-[#d3cec6]' : 'bg-[#ebe7e1]'
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[12px] text-[#626260] font-[400] tabular-nums">{page + 1} / {total}</p>
        <span className="text-[11px] text-[#9c9fa5] font-[400]">Card</span>
      </div>

      {/* Card */}
      <div className="cursor-grab active:cursor-grabbing" onPointerDown={() => {}}>
        <AnimatePresence mode="popLayout" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 350, damping: 32, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <ExpressionCard expression={exp} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-center gap-5 mt-8 pb-10">
        <NavButton onClick={prev} disabled={page === 0} label="Previous" dir="left" />
        <NavButton onClick={next} disabled={page >= total - 1} label="Next" dir="right" />
      </div>
    </div>
  )
}

function NavButton({
  onClick, disabled, label, dir,
}: {
  onClick: () => void
  disabled: boolean
  label: string
  dir: 'left' | 'right'
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-[500] transition-all duration-150 ${
        disabled
          ? 'text-[#d3cec6] cursor-not-allowed'
          : 'bg-white border border-[#d3cec6] text-[#111111] hover:bg-[#f5f1ec]'
      }`}
      style={{ borderRadius: 8 }}
    >
      {dir === 'left' && <span className="text-[11px] pr-0.5">←</span>}
      {label}
      {dir === 'right' && <span className="text-[11px] pl-0.5">→</span>}
    </button>
  )
}
