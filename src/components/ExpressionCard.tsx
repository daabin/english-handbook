import type { Expression } from '../data/types'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useProgressStore } from '../stores/progressStore'
import { SpeakButton } from './SpeakButton'

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
      className={`animate-fade-up bg-white border transition-all duration-200 ${
        done
          ? 'border-[#ebe7e1]'
          : 'border-[#d3cec6] hover:border-[#c0bbb2]'
      }`}
      style={{ borderRadius: 12 }}
    >
      <div className="px-6 py-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[22px] font-[500] text-[#111111] leading-[1.25] tracking-[-0.3px]">
                {expression.expression}
              </h3>
              <SpeakButton text={expression.expression} />
            </div>
            <p className="mt-1 text-[14px] text-[#626260] leading-snug">
              {expression.literalTranslation}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (done) unmarkCompleted(expression.chapter, expression.id)
                else markCompleted(expression.chapter, expression.id)
              }}
              className={`flex h-8 w-8 items-center justify-center text-sm font-[500] transition-all duration-150 ${
                done
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#ebe7e1] text-[#7b7b78] hover:bg-[#d3cec6] hover:text-[#111111]'
              }`}
              title={done ? '标记未学' : '标记已学'}
              style={{ borderRadius: 8 }}
            >
              ✓
            </button>
            <button
              onClick={() => toggleFavorite(expression.id)}
              className={`flex h-8 w-8 items-center justify-center text-base transition-all duration-150 ${
                fav
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#ebe7e1] text-[#7b7b78] hover:bg-[#d3cec6] hover:text-[#111111]'
              }`}
              title={fav ? '取消收藏' : '收藏'}
              style={{ borderRadius: 8 }}
            >
              {fav ? '♥' : '♡'}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="my-4 hairline" />

        {/* Natural meaning */}
        <p className="text-[16px] text-[#111111] leading-[1.6] font-[400]">
          {expression.naturalMeaning}
        </p>

        {/* Example */}
        <div className="mt-4 px-4 py-3.5 bg-[#f5f1ec]" style={{ borderRadius: 8 }}>
          <div className="flex items-start justify-between gap-2">
            <p className="flex-1 text-[15px] text-[#111111] leading-[1.55] italic">
              “{expression.example}”
            </p>
            <SpeakButton text={expression.example} />
          </div>
          <p className="mt-1.5 text-[13px] text-[#626260] leading-[1.5]">
            {expression.exampleTranslation}
          </p>
        </div>

        {/* Tags + frequency */}
        {(expression.tags.length > 0 || expression.frequency > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {expression.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-[400] text-[#626260] bg-[#f5f1ec]"
                style={{ borderRadius: 4 }}
              >
                {tag}
              </span>
            ))}
            {expression.frequency > 0 && (
              <span
                className="inline-flex items-center gap-0.5 px-2.5 py-0.5 text-[11px] text-[#9c9fa5]"
                style={{ borderRadius: 4 }}
              >
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
