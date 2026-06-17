import type { Expression } from '../data/types'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useProgressStore } from '../stores/progressStore'

interface Props {
  expression: Expression
}

export function ExpressionCard({ expression }: Props) {
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const { markCompleted, unmarkCompleted, isCompleted } = useProgressStore()
  const fav = isFavorite(expression.id)
  const done = isCompleted(expression.chapter, expression.id)

  return (
    <div
      className={`card-enter rounded-2xl bg-white shadow-sm border-2 transition-all duration-200 ${
        done
          ? 'border-emerald-300 shadow-emerald-100/50'
          : 'border-transparent hover:shadow-md hover:border-sky-100'
      }`}
      style={{ animationDelay: '0s' }}
    >
      {/* Main content */}
      <div className="px-6 pt-5 pb-4">
        {/* English expression — hero */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[28px] font-extrabold text-slate-900 leading-tight tracking-tight">
              {expression.expression}
            </h3>
            <p className="mt-1.5 text-base text-slate-400 leading-snug">
              {expression.literalTranslation}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button
              onClick={() => {
                if (done) unmarkCompleted(expression.chapter, expression.id)
                else markCompleted(expression.chapter, expression.id)
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold transition-all duration-150 ${
                done
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                  : 'bg-slate-100 text-slate-300 hover:bg-emerald-50 hover:text-emerald-500'
              }`}
              title={done ? '标记为未学' : '标记为已学'}
            >
              ✓
            </button>
            <button
              onClick={() => toggleFavorite(expression.id)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-all duration-150 ${
                fav
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'bg-slate-100 text-slate-300 hover:bg-rose-50 hover:text-rose-400'
              }`}
              title={fav ? '取消收藏' : '收藏'}
            >
              {fav ? '♥' : '♡'}
            </button>
          </div>
        </div>

        {/* Natural meaning */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm text-slate-400 font-medium">📖 实际含义</span>
          </div>
          <p className="text-xl text-slate-800 leading-relaxed font-medium">
            {expression.naturalMeaning}
          </p>
        </div>

        {/* Example — chat bubble style */}
        <div className="mt-4 bg-sky-50 rounded-xl px-5 py-4 border border-sky-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm text-sky-400 font-medium">💬 使用场景</span>
          </div>
          <p className="text-[17px] text-slate-700 leading-relaxed italic">
            “{expression.example}”
          </p>
          <p className="mt-1.5 text-[15px] text-slate-400 leading-relaxed">
            {expression.exampleTranslation}
          </p>
        </div>

        {/* Tags & frequency */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {expression.tags.map((tag) => {
            const tagColors: Record<string, string> = {
              'high-frequency': 'bg-orange-50 text-orange-600 border-orange-200',
              'daily': 'bg-emerald-50 text-emerald-600 border-emerald-200',
              'workplace': 'bg-blue-50 text-blue-600 border-blue-200',
              'meetings': 'bg-violet-50 text-violet-600 border-violet-200',
              'leadership': 'bg-amber-50 text-amber-600 border-amber-200',
              'casual': 'bg-pink-50 text-pink-600 border-pink-200',
              'formal': 'bg-slate-50 text-slate-600 border-slate-200',
              'software-engineering': 'bg-cyan-50 text-cyan-600 border-cyan-200',
              'technical': 'bg-indigo-50 text-indigo-600 border-indigo-200',
              'ai': 'bg-purple-50 text-purple-600 border-purple-200',
              'startup': 'bg-rose-50 text-rose-600 border-rose-200',
              'investment': 'bg-emerald-50 text-emerald-600 border-emerald-200',
            }
            const colors = tagColors[tag] || 'bg-slate-50 text-slate-600 border-slate-200'
            return (
              <span
                key={tag}
                className={`inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium ${colors}`}
              >
                {tag}
              </span>
            )
          })}
          {expression.frequency > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1 text-sm font-medium text-amber-600">
              <span>{'★'.repeat(expression.frequency)}{'☆'.repeat(5 - expression.frequency)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
