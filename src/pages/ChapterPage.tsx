import { useParams, Link } from 'react-router-dom'
import { books, getChapterData } from '../data'
import { ExpressionCard } from '../components/ExpressionCard'
import { CardMode } from '../components/CardMode'
import { useProgressStore } from '../stores/progressStore'
import { useRecentStore } from '../stores/recentStore'
import { useReadingModeStore } from '../stores/readingModeStore'
import { useFilterStore } from '../stores/filterStore'
import { useEffect, useMemo } from 'react'

export function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const { visitChapter } = useRecentStore()
  const { mode, toggle } = useReadingModeStore()

  const allChapters = books.flatMap((b) => b.chapters)
  const chapter = allChapters.find((c) => c.id === chapterId)
  const book = books.find((b) => b.id === chapter?.bookId)
  const expressions = chapterId ? getChapterData(chapterId) : []

  const { getChapterProgress, isCompleted } = useProgressStore()
  const hideCompleted = useFilterStore((s) => s.hideCompleted)
  const { done } = getChapterProgress(chapterId || '', chapter?.count || 0)

  const visibleExpressions = useMemo(() => {
    if (!hideCompleted) return expressions
    return expressions.filter((exp) => !isCompleted(exp.chapter, exp.id))
  }, [expressions, hideCompleted, isCompleted])

  useEffect(() => {
    if (chapterId) { visitChapter(chapterId); window.scrollTo(0, 0) }
  }, [chapterId, visitChapter])

  if (!chapter || !book) {
    return (
      <div className="px-6 py-10">
        <p className="text-[#626260] text-[14px]">Chapter not found</p>
        <Link to="/" className="text-[13px] text-[#111111] underline underline-offset-2 hover:text-[#626260] transition-colors">Back home</Link>
      </div>
    )
  }

  const pct = chapter.count > 0 ? Math.round((done / chapter.count) * 100) : 0

  return (
    <div className="mx-auto max-w-[640px] px-6 py-10 lg:py-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#7b7b78] mb-6">
        <Link to="/" className="no-underline text-[#7b7b78] hover:text-[#111111] transition-colors">Home</Link>
        <span className="text-[#d3cec6]">/</span>
        <Link to={`/books/${book.id}`} className="no-underline text-[#7b7b78] hover:text-[#111111] transition-colors">
          {book.title}
        </Link>
        <span className="text-[#d3cec6]">/</span>
        <span className="text-[#111111] font-[500]">{chapter.title}</span>
      </div>

      {/* Chapter header — hidden in card mode */}
      {mode === 'scroll' && (
        <div className="animate-fade-up mb-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-[28px] sm:text-[40px] font-[500] text-[#111111] leading-[1.15] tracking-[-0.8px]">
                {chapter.title}
              </h1>
              <p className="mt-1 text-[14px] text-[#626260]">{chapter.description}</p>
            </div>
            <div className="shrink-0 text-right pt-1">
              <p className="text-[20px] font-[500] text-[#111111] leading-none tabular-nums">
                {hideCompleted ? visibleExpressions.length : chapter.count}
              </p>
              <p className="text-[10px] text-[#7b7b78] mt-0.5">
                {hideCompleted && done > 0 ? `of ${chapter.count}` : 'Expressions'}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5 bg-white border border-[#d3cec6] px-5 py-4" style={{ borderRadius: 12 }}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[12px] text-[#7b7b78] font-[500]">Progress</span>
              <span className="text-[12px] text-[#111111] font-[500] tabular-nums">
                {hideCompleted ? `${visibleExpressions.length}/${done}` : `${done}/${chapter.count}`}
              </span>
            </div>
            <div className="h-[2px] bg-[#ebe7e1] overflow-hidden">
              <div className="h-full bg-[#111111] transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
            </div>
            {done === chapter.count && done > 0 && (
              <p className="mt-1.5 text-[11px] text-[#7b7b78]">All expressions completed</p>
            )}
          </div>
        </div>
      )}

      {/* Mode toggle */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex bg-white border border-[#d3cec6]" style={{ borderRadius: 8 }}>
          <button
            onClick={() => mode === 'card' && toggle()}
            className={`px-4 py-2 text-[12px] font-[500] transition-all duration-150 ${
              mode === 'scroll'
                ? 'bg-[#111111] text-white'
                : 'bg-white text-[#626260] hover:text-[#111111]'
            }`}
            style={{ borderRadius: 8 }}
          >
            List
          </button>
          <button
            onClick={() => mode === 'scroll' && toggle()}
            className={`px-4 py-2 text-[12px] font-[500] transition-all duration-150 ${
              mode === 'card'
                ? 'bg-[#111111] text-white'
                : 'bg-white text-[#626260] hover:text-[#111111]'
            }`}
            style={{ borderRadius: 8 }}
          >
            Card
          </button>
        </div>
      </div>

      {/* Content */}
      {mode === 'card' ? (
        <CardMode expressions={visibleExpressions} />
      ) : visibleExpressions.length === 0 ? (
        <div className="bg-white border border-[#d3cec6] px-6 py-10 text-center" style={{ borderRadius: 12 }}>
          <p className="text-[#7b7b78] text-[14px]">
            {hideCompleted ? 'All expressions completed' : 'No expressions yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {hideCompleted && (
            <p className="text-[11px] text-[#9c9fa5] text-center">
              Showing {visibleExpressions.length} of {expressions.length}
            </p>
          )}
          {visibleExpressions.map((exp) => (
            <ExpressionCard key={exp.id} expression={exp} />
          ))}
        </div>
      )}
    </div>
  )
}
