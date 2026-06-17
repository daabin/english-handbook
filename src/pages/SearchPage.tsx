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
    <div className="mx-auto max-w-[640px] px-6 py-12 lg:py-16">
      <h1 className="text-[40px] sm:text-[56px] font-[500] text-[#111111] leading-[1.1] tracking-[-1.4px] mb-8">
        Search
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search English or Chinese..."
            className="w-full bg-white border border-[#d3cec6] px-4 py-2.5 text-[14px] text-[#111111] outline-none transition-colors focus:border-[#111111] placeholder:text-[#d3cec6]"
            style={{ borderRadius: 8 }}
            autoFocus
          />
        </div>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="bg-white border border-[#d3cec6] px-3 py-2.5 text-[13px] text-[#626260] outline-none"
          style={{ borderRadius: 8 }}
        >
          <option value="">All chapters</option>
          {books.flatMap((b) => b.chapters).map((ch) => (
            <option key={ch.id} value={ch.id}>{ch.title}</option>
          ))}
        </select>
      </div>

      {query.trim() && (
        <p className="mb-4 text-[12px] text-[#7b7b78]">
          <span className="tabular-nums">{results.length}</span> results
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((exp) => (
            <div key={exp.id}>
              <p className="mb-1 ml-1 text-[11px] text-[#7b7b78]">{exp.chapterTitle}</p>
              <ExpressionCard expression={exp} />
            </div>
          ))}
        </div>
      ) : query.trim() ? (
        <div className="bg-white border border-[#d3cec6] px-6 py-10 text-center" style={{ borderRadius: 12 }}>
          <p className="text-[#7b7b78] text-[14px]">No results found</p>
          <p className="mt-1 text-[12px] text-[#9c9fa5]">Try different search terms</p>
        </div>
      ) : (
        <div className="bg-white border border-[#d3cec6] px-6 py-10 text-center" style={{ borderRadius: 12 }}>
          <p className="text-[#7b7b78] text-[14px]">Type to search</p>
          <p className="mt-1 text-[12px] text-[#9c9fa5]">English or Chinese</p>
        </div>
      )}
    </div>
  )
}
