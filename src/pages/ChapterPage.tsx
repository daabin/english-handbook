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
      <div className="p-8">
        <p className="text-slate-500">章节未找到</p>
        <Link to="/" className="text-sm text-sky-600">返回首页</Link>
      </div>
    )
  }

  const progressPct = chapter.count > 0 ? Math.round((done / chapter.count) * 100) : 0

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/" className="no-underline text-slate-400 hover:text-sky-600 transition-colors">
          首页
        </Link>
        <span className="text-slate-300">›</span>
        <Link to={`/books/${book.id}`} className="no-underline text-slate-400 hover:text-sky-600 transition-colors">
          {book.title}
        </Link>
        <span className="text-slate-300">›</span>
        <span className="text-slate-600 font-medium">{chapter.title}</span>
      </div>

      {/* Chapter Header — Duolingo-like card */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{chapter.title}</h1>
            <p className="mt-1 text-base text-slate-500">{chapter.description}</p>
          </div>
          {/* Chapter count badge */}
          <div className="shrink-0 rounded-xl bg-sky-50 border border-sky-100 px-4 py-2 text-center">
            <p className="text-2xl font-extrabold text-sky-600 leading-none">{chapter.count}</p>
            <p className="text-[11px] text-sky-400 font-medium mt-0.5">表达</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-slate-500 font-medium">学习进度</span>
              {done === chapter.count && done > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                  ✓ 已完成
                </span>
              )}
            </div>
            <span className="text-sm font-bold text-sky-600">{done}/{chapter.count}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
            <div
              className="h-full rounded-full progress-glow transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expression list */}
      <div className="space-y-4">
        {expressions.map((exp) => (
          <ExpressionCard key={exp.id} expression={exp} />
        ))}
      </div>
    </div>
  )
}
