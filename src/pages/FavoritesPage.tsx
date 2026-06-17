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
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">❤️ 收藏的表达</h1>
      <p className="text-base text-slate-500 mb-6">
        共 <span className="font-semibold text-slate-600">{allExpressions.length}</span> 条收藏
      </p>

      {allExpressions.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-lg text-slate-400">还没有收藏任何表达</p>
          <p className="mt-1 text-sm text-slate-300">浏览章节时点击 ♡ 按钮即可收藏</p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-5 py-3 text-base font-semibold text-white no-underline hover:bg-sky-600 transition-colors shadow-sm"
          >
            📚 开始学习
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {allExpressions.map((exp) => (
            <div key={exp.id}>
              <Link
                to={`/chapters/${exp.chapter}`}
                className="mb-1 ml-1 inline-flex items-center gap-1 text-sm text-sky-500 no-underline hover:text-sky-700 transition-colors font-medium"
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
