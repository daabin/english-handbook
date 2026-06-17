import { useParams, Link } from 'react-router-dom'
import { books } from '../data'

export function BookPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find((b) => b.id === bookId)

  if (!book) {
    return (
      <div className="p-8">
        <p className="text-slate-500">书籍未找到</p>
        <Link to="/" className="text-sm text-sky-600">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/" className="no-underline text-slate-400 hover:text-sky-600 transition-colors">首页</Link>
        <span className="text-slate-300">›</span>
        <span className="text-slate-600 font-medium">{book.title}</span>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">{book.title}</h1>
      <p className="text-lg text-slate-500 mb-8">{book.description}</p>

      <div className="grid grid-cols-1 gap-4">
        {book.chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/chapters/${ch.id}`}
            className="block rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-5 no-underline transition-all hover:shadow-md hover:border-sky-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-bold text-sm border border-sky-100">
                {ch.count}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">{ch.title}</h3>
                <p className="mt-0.5 text-sm text-slate-400">{ch.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
