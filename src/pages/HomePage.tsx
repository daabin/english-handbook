import { NavLink } from 'react-router-dom'
import { books, getChapterData } from '../data'
import { useProgressStore } from '../stores/progressStore'
import { useFavoritesStore } from '../stores/favoritesStore'
import { getTotalExpressionCount } from '../data/chapters'

export function HomePage() {
  const { getTotalCompleted } = useProgressStore()
  const { favorites } = useFavoritesStore()
  const totalCompleted = getTotalCompleted()
  const totalExpressions = getTotalExpressionCount()

  const allData = books.flatMap((b) => b.chapters).flatMap((ch) => getChapterData(ch.id))
  const dailyPick = allData.length > 0
    ? allData[Math.floor(Math.random() * allData.length)]
    : null

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[24px] sm:text-[32px] font-[700] text-[#1d1d1f] leading-[1.15] tracking-[-0.02em]">
          American Tech English Handbook
        </h1>
        <p className="mt-1.5 sm:mt-2 text-[15px] sm:text-[17px] text-[#86868b] leading-snug">
          面向程序员和技术管理者的地道美式英语学习手册
        </p>
      </div>

      {/* Stats — 3 cols on desktop, scroll horizontally on mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
        <div className="rounded-[14px] sm:rounded-2xl bg-white shadow-sm px-3 sm:px-5 py-4 sm:py-5">
          <p className="text-[11px] sm:text-sm text-[#86868b] font-medium mb-1">已学习</p>
          <p className="text-[22px] sm:text-[28px] font-[700] text-[#0071e3] leading-none">
            {totalCompleted}
            <span className="text-[13px] sm:text-base font-normal text-[#c7c7cc]"> / {totalExpressions}</span>
          </p>
        </div>
        <div className="rounded-[14px] sm:rounded-2xl bg-white shadow-sm px-3 sm:px-5 py-4 sm:py-5">
          <p className="text-[11px] sm:text-sm text-[#86868b] font-medium mb-1">收藏</p>
          <p className="text-[22px] sm:text-[28px] font-[700] text-[#ff3b30] leading-none">{favorites.length}</p>
        </div>
        <div className="rounded-[14px] sm:rounded-2xl bg-white shadow-sm px-3 sm:px-5 py-4 sm:py-5">
          <p className="text-[11px] sm:text-sm text-[#86868b] font-medium mb-1">章节</p>
          <p className="text-[22px] sm:text-[28px] font-[700] text-[#1d1d1f] leading-none">
            {books.reduce((s, b) => s + b.chapters.length, 0)}
          </p>
        </div>
      </div>

      {/* Daily Pick */}
      {dailyPick && (
        <div className="mb-6 sm:mb-8 rounded-[16px] sm:rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200/60 shadow-sm px-4 sm:px-6 py-4 sm:py-5">
          <p className="text-[11px] sm:text-sm text-amber-500 font-semibold tracking-wide uppercase mb-2">今日推荐</p>
          <p className="text-[20px] sm:text-[24px] font-[700] text-[#1d1d1f] leading-tight">
            {dailyPick.expression}
          </p>
          <p className="mt-1.5 text-[14px] sm:text-base text-[#86868b]">
            {dailyPick.naturalMeaning}
          </p>
        </div>
      )}

      {/* Books */}
      <h2 className="text-[17px] sm:text-lg font-[700] text-[#1d1d1f] mb-3 sm:mb-4">全部书籍</h2>
      <div className="space-y-3 sm:space-y-4">
        {books.map((book) => (
          <div key={book.id} className="rounded-[16px] sm:rounded-2xl bg-white shadow-sm overflow-hidden">
            <NavLink
              to={`/books/${book.id}`}
              className="block px-4 sm:px-6 py-3 sm:py-4 no-underline hover:bg-[#f5f5f7] transition-colors border-b border-[#f0f0f2]"
            >
              <h3 className="text-[15px] sm:text-lg font-[700] text-[#1d1d1f]">{book.title}</h3>
              <p className="mt-0.5 text-[12px] sm:text-sm text-[#86868b]">{book.description}</p>
            </NavLink>
            <div>
              {book.chapters.map((ch) => {
                const { done } = useProgressStore.getState().getChapterProgress(ch.id, ch.count)
                const pct = ch.count > 0 ? Math.round((done / ch.count) * 100) : 0
                return (
                  <NavLink
                    key={ch.id}
                    to={`/chapters/${ch.id}`}
                    className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm no-underline transition-colors hover:bg-[#f5f5f7]/80"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 shrink-0
                          ${done === ch.count && done > 0
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : done > 0
                            ? 'bg-[#f5f5f7] border-[#0071e3] text-[#0071e3]'
                            : 'bg-white border-[#d2d2d7] text-[#c7c7cc]'
                          }`}
                      >
                        {done === ch.count && done > 0 ? '✓' : ch.count}
                      </div>
                      <span className={`truncate ${done === ch.count && done > 0 ? 'text-[#c7c7cc] line-through' : 'text-[#1d1d1f]'}`}>
                        {ch.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {done > 0 && (
                        <span className="text-[11px] sm:text-xs text-[#86868b]">{done}/{ch.count}</span>
                      )}
                      {pct > 0 && (
                        <div className="w-12 sm:w-16 h-1.5 rounded-full bg-[#f0f0f2] overflow-hidden">
                          <div
                            className="h-full rounded-full progress-apple transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
