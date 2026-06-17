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
      className={`animate-fade-up rounded-[20px] bg-white transition-all duration-200 ${
        done
          ? 'shadow-sm'
          : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4 sm:pb-5">
        {/* Top row: expression + actions */}
        <div className="flex items-start justify-between gap-3 sm:gap-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-[22px] sm:text-[26px] font-[700] text-[#1d1d1f] leading-[1.25] tracking-[-0.02em]">
              {expression.expression}
            </h3>
            <p className="mt-1.5 text-[13px] sm:text-[15px] text-[#86868b] leading-snug font-[400] tracking-[-0.01em]">
              {expression.literalTranslation}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            <button
              onClick={() => {
                if (done) unmarkCompleted(expression.chapter, expression.id)
                else markCompleted(expression.chapter, expression.id)
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-base font-semibold transition-all duration-150 ${
                done
                  ? 'bg-[#0071e3] text-white'
                  : 'bg-[#f5f5f7] text-[#86868b] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]'
              }`}
              title={done ? '标记未学' : '标记已学'}
            >
              ✓
            </button>
            <button
              onClick={() => toggleFavorite(expression.id)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all duration-150 ${
                fav
                  ? 'bg-[#ff3b30] text-white'
                  : 'bg-[#f5f5f7] text-[#86868b] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]'
              }`}
              title={fav ? '取消收藏' : '收藏'}
            >
              {fav ? '♥' : '♡'}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="my-5 h-px bg-[#f0f0f2]" />

        {/* Natural meaning — Chinese-heavy, more spacing */}
        <p className="text-[17px] sm:text-[19px] text-[#1d1d1f] leading-[1.7] font-[500] tracking-[0.01em]">
          {expression.naturalMeaning}
        </p>

        {/* Example sentence */}
        <div className="mt-4 rounded-[14px] bg-[#f5f5f7] px-5 py-4">
          <p className="text-[15px] sm:text-[17px] text-[#1d1d1f] leading-[1.6] italic tracking-[-0.01em]">
            “{expression.example}”
          </p>
          <p className="mt-2 text-[13px] sm:text-[15px] text-[#86868b] leading-[1.65] tracking-[0.01em]">
            {expression.exampleTranslation}
          </p>
        </div>

        {/* Tags */}
        {(expression.tags.length > 0 || expression.frequency > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {expression.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#f5f5f7] px-3 py-1 text-[12px] text-[#86868b] font-[500]"
              >
                {tag}
              </span>
            ))}
            {expression.frequency > 0 && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[#f5f5f7] px-3 py-1 text-[12px] text-[#86868b]">
                {'★'.repeat(expression.frequency)}
                {'☆'.repeat(5 - expression.frequency)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
