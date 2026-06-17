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
  const dailyPicks = allData.length > 0
    ? [allData[Math.floor(Math.random() * allData.length)]].filter(Boolean)
    : []

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          American Tech English Handbook
        </h1>
        <p className="mt-2 text-lg text-slate-500">
          面向中国程序员和技术管理者的地道美式英语学习手册
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 px-5 py-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📚</span>
            <span className="text-sm text-slate-400 font-medium">已学习</span>
          </div>
          <p className="text-3xl font-extrabold text-sky-600">
            {totalCompleted}
            <span className="text-base font-normal text-slate-400"> / {totalExpressions}</span>
          </p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 px-5 py-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">❤️</span>
            <span className="text-sm text-slate-400 font-medium">收藏</span>
          </div>
          <p className="text-3xl font-extrabold text-rose-500">{favorites.length}</p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 px-5 py-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📖</span>
            <span className="text-sm text-slate-400 font-medium">章节</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-700">{books.reduce((s, b) => s + b.chapters.length, 0)}</p>
        </div>
      </div>

      {/* Daily Pick */}
      {dailyPicks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-3">🌟 今日推荐</h2>
          <div className="rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm px-6 py-5">
            <p className="text-2xl font-extrabold text-slate-900 leading-tight">
              {dailyPicks[0].expression}
            </p>
            <p className="mt-2 text-base text-slate-600">
              {dailyPicks[0].naturalMeaning}
            </p>
            <p className="mt-2 text-sm italic text-slate-400">
              “{dailyPicks[0].example}”
            </p>
          </div>
        </div>
      )}

      {/* Books */}
      <h2 className="text-lg font-bold text-slate-800 mb-4">全部书籍</h2>
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
            <NavLink
              to={`/books/${book.id}`}
              className="block px-6 py-4 no-underline hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-800">{book.title}</h3>
              <p className="mt-0.5 text-sm text-slate-400">{book.description}</p>
            </NavLink>
            <div>
              {book.chapters.map((ch) => {
                const { done } = useProgressStore.getState().getChapterProgress(ch.id, ch.count)
                const pct = ch.count > 0 ? Math.round((done / ch.count) * 100) : 0
                return (
                  <NavLink
                    key={ch.id}
                    to={`/chapters/${ch.id}`}
                    className="flex items-center justify-between px-6 py-3 text-sm no-underline transition-colors hover:bg-sky-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2
                          ${done === ch.count && done > 0
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : done > 0
                            ? 'bg-sky-50 border-sky-300 text-sky-600'
                            : 'bg-white border-slate-200 text-slate-300'
                          }`}
                      >
                        {done === ch.count && done > 0 ? '✓' : ch.count}
                      </div>
                      <span className={done === ch.count && done > 0 ? 'text-slate-500 line-through' : 'text-slate-700'}>
                        {ch.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {done > 0 && (
                        <span className="text-xs text-slate-400">
                          {done}/{ch.count}
                        </span>
                      )}
                      {pct > 0 && (
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-sky-400 transition-all"
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
