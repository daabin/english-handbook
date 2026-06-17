import { useFavoritesStore } from '../stores/favoritesStore'
import { getChapterData } from '../data'
import { ExpressionCard } from '../components/ExpressionCard'
import { books } from '../data'
import { Link } from 'react-router-dom'

export function FavoritesPage() {
  const { favorites } = useFavoritesStore()

  const allExpressions = books
    .flatMap((b) => b.chapters)
    .flatMap((ch) => {
      const data = getChapterData(ch.id)
      return data.map((exp) => ({ ...exp, chapterTitle: ch.title, bookId: ch.bookId }))
    })
    .filter((exp) => favorites.includes(exp.id))

  return (
    <div className="mx-auto max-w-[640px] px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
      <h1 className="text-[24px] sm:text-[32px] font-[700] text-[#1d1d1f] leading-tight tracking-[-0.02em] mb-1">
        ❤️ 收藏的表达
      </h1>
      <p className="text-[14px] sm:text-base text-[#86868b] mb-5 sm:mb-6">
        共 <span className="font-semibold text-[#1d1d1f]">{allExpressions.length}</span> 条收藏
      </p>

      {allExpressions.length === 0 ? (
        <div className="rounded-[16px] sm:rounded-2xl border-2 border-dashed border-[#e8e8ed] bg-white px-6 py-10 sm:p-12 text-center">
          <p className="text-[15px] sm:text-lg text-[#86868b]">还没有收藏任何表达</p>
          <p className="mt-1 text-[13px] sm:text-sm text-[#c7c7cc]">浏览章节时点击 ♡ 按钮即可收藏</p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-[12px] bg-[#0071e3] px-5 py-3 text-[15px] font-semibold text-white no-underline hover:bg-[#0077ed] transition-colors shadow-sm"
          >
            开始学习
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {allExpressions.map((exp) => (
            <div key={exp.id}>
              <Link
                to={`/chapters/${exp.chapter}`}
                className="mb-1 ml-1 inline-flex items-center gap-1 text-[12px] sm:text-sm text-[#0071e3] no-underline hover:text-[#0077ed] transition-colors font-medium"
              >
                ← {exp.chapterTitle}
              </Link>
              <ExpressionCard expression={exp} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
