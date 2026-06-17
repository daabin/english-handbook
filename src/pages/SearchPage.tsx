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
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">🔍 搜索</h1>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入英文或中文搜索..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base outline-none transition-all focus:border-sky-300 focus:shadow-sm pl-12"
            autoFocus
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-300">🔍</span>
        </div>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none"
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
        <p className="mb-4 text-sm text-slate-400">
          找到 <span className="font-semibold text-slate-600">{results.length}</span> 条结果
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((exp) => (
            <div key={exp.id}>
              <div className="mb-1 ml-1 text-sm text-slate-400 font-medium">
                ← {exp.chapterTitle}
              </div>
              <ExpressionCard expression={exp} />
            </div>
          ))}
        </div>
      ) : query.trim() ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-lg text-slate-400">没有找到匹配的结果</p>
          <p className="mt-1 text-sm text-slate-300">试试其他关键词</p>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-lg text-slate-400">输入关键词开始搜索</p>
          <p className="mt-1 text-sm text-slate-300">支持英文、中文和模糊搜索</p>
        </div>
      )}
    </div>
  )
}
