import { useParams, Link } from 'react-router-dom'
import { books, getChapterData } from '../data'
import { ExpressionCard } from '../components/ExpressionCard'
import { useProgressStore } from '../stores/progressStore'
import { useRecentStore } from '../stores/recentStore'
import { useEffect } from 'react'

export function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const { visitChapter } = useRecentStore()

  const allChapters = books.flatMap((b) => b.chapters)
  const chapter = allChapters.find((c) => c.id === chapterId)
  const book = books.find((b) => b.id === chapter?.bookId)
  const expressions = chapterId ? getChapterData(chapterId) : []

  const { getChapterProgress } = useProgressStore()
  const { done } = getChapterProgress(chapterId || '', chapter?.count || 0)

  useEffect(() => {
    if (chapterId) {
      visitChapter(chapterId)
      window.scrollTo(0, 0)
    }
  }, [chapterId, visitChapter])

  if (!chapter || !book) {
    return (
      <div className="px-4 py-8">
        <p className="text-[#86868b]">章节未找到</p>
        <Link to="/" className="text-sm text-[#0071e3]">返回首页</Link>
      </div>
    )
  }

  const pct = chapter.count > 0 ? Math.round((done / chapter.count) * 100) : 0

  return (
    <div className="mx-auto max-w-[640px] px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
      {/* Breadcrumb — hidden on very small screens */}
      <nav className="hidden sm:flex items-center gap-1.5 text-[13px] text-[#86868b] mb-6 lg:mb-8">
        <Link to="/" className="no-underline text-[#86868b] hover:text-[#0071e3] transition-colors">首页</Link>
        <span className="text-[#c7c7cc]">/</span>
        <Link to={`/books/${book.id}`} className="no-underline text-[#86868b] hover:text-[#0071e3] transition-colors">
          {book.title}
        </Link>
        <span className="text-[#c7c7cc]">/</span>
        <span className="text-[#1d1d1f] font-medium">{chapter.title}</span>
      </nav>

      {/* Chapter header */}
      <div className="animate-fade-up mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] sm:text-[28px] font-[700] text-[#1d1d1f] leading-[1.15] tracking-[-0.02em]">
              {chapter.title}
            </h1>
            <p className="mt-1 text-[14px] sm:text-[15px] text-[#86868b]">
              {chapter.description}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[20px] sm:text-[22px] font-[700] text-[#0071e3] leading-none">{chapter.count}</p>
            <p className="text-[11px] sm:text-[12px] text-[#86868b] mt-0.5">expressions</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 sm:mt-6 rounded-[14px] sm:rounded-[14px] bg-white shadow-sm px-4 sm:px-5 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] sm:text-[13px] text-[#86868b] font-medium">Progress</span>
            <span className="text-[12px] sm:text-[13px] text-[#0071e3] font-semibold">{done}/{chapter.count}</span>
          </div>
          <div className="h-[5px] sm:h-[6px] rounded-full bg-[#f0f0f2] overflow-hidden">
            <div
              className="h-full rounded-full progress-apple transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          {done === chapter.count && done > 0 && (
            <p className="mt-2 text-[11px] sm:text-[12px] text-[#30d158] font-semibold">✓ 已完成全部表达</p>
          )}
        </div>
      </div>

      {/* Expression list */}
      <div className="space-y-3 sm:space-y-4">
        {expressions.length === 0 ? (
          <div className="rounded-[20px] bg-white shadow-sm px-6 py-8 text-center">
            <p className="text-[#86868b] text-[15px]">内容加载中...</p>
          </div>
        ) : (
          expressions.map((exp) => (
            <ExpressionCard key={exp.id} expression={exp} />
          ))
        )}
      </div>
    </div>
  )
}
