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
    <div className="mx-auto max-w-[640px] px-6 py-12 lg:py-16">
      <h1 className="text-[40px] sm:text-[56px] font-[500] text-[#111111] leading-[1.1] tracking-[-1.4px] mb-1">
        Favorites
      </h1>
      <p className="text-[14px] text-[#626260] mb-8">
        <span className="tabular-nums">{allExpressions.length}</span> saved expressions
      </p>

      {allExpressions.length === 0 ? (
        <div className="bg-white border border-[#d3cec6] px-6 py-10 text-center" style={{ borderRadius: 12 }}>
          <p className="text-[#7b7b78] text-[14px]">No favorites yet</p>
          <p className="mt-1 text-[12px] text-[#9c9fa5]">Tap ♥ on any expression to save it</p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center px-4 py-2 bg-[#111111] text-white text-[13px] font-[500] no-underline hover:bg-[#111111]/90 transition-colors"
            style={{ borderRadius: 8 }}
          >
            Start Learning
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {allExpressions.map((exp) => (
            <div key={exp.id}>
              <Link
                to={`/chapters/${exp.chapter}`}
                className="mb-1 ml-1 inline-flex items-center gap-1 text-[11px] text-[#7b7b78] no-underline hover:text-[#111111] transition-colors"
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
