import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { books, getChapterData } from '../data'
import { ExpressionCard } from '../components/ExpressionCard'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedChapter, setSelectedChapter] = useState<string>('')

  const allExpressions = useMemo(() => {
    return books
      .flatMap((b) => b.chapters)
      .flatMap((ch) => {
        const data = getChapterData(ch.id)
        return data.map((exp) => ({ ...exp, chapterTitle: ch.title }))
      })
  }, [])

  const fuse = useMemo(
    () =>
      new Fuse(allExpressions, {
        keys: [
          { name: 'expression', weight: 2 },
          { name: 'literalTranslation', weight: 1.5 },
          { name: 'naturalMeaning', weight: 1.5 },
          { name: 'example', weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [allExpressions],
  )

  const results = useMemo(() => {
    if (!query.trim()) return []
    let res = fuse.search(query.trim()).map((r) => r.item)
    if (selectedChapter) {
      res = res.filter((r) => r.chapter === selectedChapter)
    }
    return res
  }, [query, fuse, selectedChapter])

  return (
    <div className="mx-auto max-w-[640px] px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
      <h1 className="text-[24px] sm:text-[32px] font-[700] text-[#1d1d1f] leading-tight tracking-[-0.02em] mb-5 sm:mb-6">
        🔍 搜索
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base sm:text-lg text-[#c7c7cc] pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入英文或中文搜索..."
            className="w-full rounded-[14px] sm:rounded-2xl border border-[#e8e8ed] bg-white px-5 py-3 sm:py-4 text-[15px] sm:text-base outline-none transition-all focus:border-[#0071e3] focus:shadow-sm pl-11"
            autoFocus
          />
        </div>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="rounded-[14px] sm:rounded-2xl border border-[#e8e8ed] bg-white px-4 py-3 sm:py-2 text-[14px] sm:text-sm text-[#86868b] outline-none"
        >
          <option value="">全部章节</option>
          {books.flatMap((b) => b.chapters).map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.title}
            </option>
          ))}
        </select>
      </div>

      {query.trim() && (
        <p className="mb-4 text-[13px] sm:text-sm text-[#86868b]">
          找到 <span className="font-semibold text-[#1d1d1f]">{results.length}</span> 条结果
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {results.map((exp) => (
            <div key={exp.id}>
              <div className="mb-1 ml-1 text-[12px] sm:text-sm text-[#86868b] font-medium">
                ← {exp.chapterTitle}
              </div>
              <ExpressionCard expression={exp} />
            </div>
          ))}
        </div>
      ) : query.trim() ? (
        <div className="rounded-[16px] sm:rounded-2xl border-2 border-dashed border-[#e8e8ed] bg-white px-6 py-10 sm:p-12 text-center">
          <p className="text-[15px] sm:text-lg text-[#86868b]">没有找到匹配的结果</p>
          <p className="mt-1 text-[13px] sm:text-sm text-[#c7c7cc]">试试其他关键词</p>
        </div>
      ) : (
        <div className="rounded-[16px] sm:rounded-2xl border-2 border-dashed border-[#e8e8ed] bg-white px-6 py-10 sm:p-12 text-center">
          <p className="text-[15px] sm:text-lg text-[#86868b]">输入关键词开始搜索</p>
          <p className="mt-1 text-[13px] sm:text-sm text-[#c7c7cc]">支持英文、中文和模糊搜索</p>
        </div>
      )}
    </div>
  )
}
