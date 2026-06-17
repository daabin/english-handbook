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
    <div className="mx-auto max-w-[640px] px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[40px] sm:text-[56px] font-[500] text-[#111111] leading-[1.1] tracking-[-1.4px]">
          American Tech<br />English Handbook
        </h1>
        <p className="mt-3 text-[16px] text-[#626260] leading-relaxed max-w-[440px]">
          面向程序员和技术管理者的地道美式英语学习手册
        </p>
      </div>

      {/* Stats — cream tiles */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="bg-white border border-[#d3cec6] px-4 py-4" style={{ borderRadius: 12 }}>
          <p className="text-[11px] text-[#7b7b78] font-[500] mb-1.5">Learned</p>
          <p className="text-[22px] font-[500] text-[#111111] leading-none tabular-nums">
            {totalCompleted}
            <span className="text-[14px] text-[#9c9fa5]">/{totalExpressions}</span>
          </p>
        </div>
        <div className="bg-white border border-[#d3cec6] px-4 py-4" style={{ borderRadius: 12 }}>
          <p className="text-[11px] text-[#7b7b78] font-[500] mb-1.5">Saved</p>
          <p className="text-[22px] font-[500] text-[#111111] leading-none tabular-nums">{favorites.length}</p>
        </div>
        <div className="bg-white border border-[#d3cec6] px-4 py-4" style={{ borderRadius: 12 }}>
          <p className="text-[11px] text-[#7b7b78] font-[500] mb-1.5">Chapters</p>
          <p className="text-[22px] font-[500] text-[#111111] leading-none tabular-nums">
            {books.reduce((s, b) => s + b.chapters.length, 0)}
          </p>
        </div>
      </div>

      {/* Daily Pick */}
      {dailyPick && (
        <div className="mb-10 bg-white border border-[#d3cec6] px-5 py-4" style={{ borderRadius: 12 }}>
          <p className="text-[11px] text-[#7b7b78] font-[500] mb-2">Daily Pick</p>
          <p className="text-[20px] font-[500] text-[#111111] leading-tight tracking-[-0.3px]">
            {dailyPick.expression}
          </p>
          <p className="mt-1.5 text-[14px] text-[#626260]">
            {dailyPick.naturalMeaning}
          </p>
        </div>
      )}

      {/* Books */}
      <h2 className="text-[12px] text-[#7b7b78] font-[500] mb-4">All Books</h2>
      <div className="space-y-3">
        {books.map((book) => (
          <div key={book.id} className="bg-white border border-[#d3cec6]" style={{ borderRadius: 12 }}>
            <NavLink
              to={`/books/${book.id}`}
              className="block px-5 py-4 no-underline hover:bg-[#f5f1ec] transition-colors border-b border-[#ebe7e1]"
              style={{ borderRadius: '12px 12px 0 0' }}
            >
              <h3 className="text-[15px] font-[500] text-[#111111]">{book.title}</h3>
              <p className="mt-0.5 text-[12px] text-[#626260]">{book.description}</p>
            </NavLink>
            <div>
              {book.chapters.map((ch) => {
                const { done } = useProgressStore.getState().getChapterProgress(ch.id, ch.count)
                const pct = ch.count > 0 ? Math.round((done / ch.count) * 100) : 0
                return (
                  <NavLink
                    key={ch.id}
                    to={`/chapters/${ch.id}`}
                    className="flex items-center justify-between px-5 py-2.5 text-[13px] no-underline transition-colors hover:bg-[#f5f1ec]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-5 h-5 flex items-center justify-center text-[10px] leading-none border ${
                          done === ch.count && done > 0
                            ? 'bg-[#111111] border-[#111111] text-white'
                            : 'border-[#d3cec6] text-[#9c9fa5]'
                        }`}
                        style={{ borderRadius: 4 }}
                      >
                        {done === ch.count && done > 0 ? '✓' : ch.count}
                      </span>
                      <span className={`truncate ${done === ch.count && done > 0 ? 'text-[#d3cec6] line-through' : 'text-[#626260]'}`}>
                        {ch.title}
                      </span>
                    </div>
                    {pct > 0 && (
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[11px] text-[#9c9fa5] tabular-nums">{done}/{ch.count}</span>
                        <div className="w-12 h-[2px] bg-[#ebe7e1] overflow-hidden">
                          <div className="h-full bg-[#111111]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}
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
