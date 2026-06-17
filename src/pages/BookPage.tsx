import { useParams, Link } from 'react-router-dom'
import { books } from '../data'

export function BookPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find((b) => b.id === bookId)

  if (!book) {
    return (
      <div className="px-6 py-10">
        <p className="text-[#626260] text-[14px]">Book not found</p>
        <Link to="/" className="text-[13px] text-[#111111] underline underline-offset-2 hover:text-[#626260] transition-colors">Back home</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[640px] px-6 py-12 lg:py-16">
      <div className="flex items-center gap-1.5 text-[12px] text-[#7b7b78] mb-6">
        <Link to="/" className="no-underline text-[#7b7b78] hover:text-[#111111] transition-colors">Home</Link>
        <span className="text-[#d3cec6]">/</span>
        <span className="text-[#111111] font-[500]">{book.title}</span>
      </div>

      <h1 className="text-[40px] sm:text-[56px] font-[500] text-[#111111] leading-[1.1] tracking-[-1.4px] mb-1">{book.title}</h1>
      <p className="text-[14px] text-[#626260] mb-8">{book.description}</p>

      <div className="space-y-2">
        {book.chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/chapters/${ch.id}`}
            className="flex items-center gap-3 bg-white border border-[#d3cec6] px-5 py-4 no-underline transition-colors hover:bg-[#f5f1ec]"
            style={{ borderRadius: 12 }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center border border-[#d3cec6] text-[11px] text-[#7b7b78] tabular-nums"
              style={{ borderRadius: 6 }}
            >
              {ch.count}
            </span>
            <div className="min-w-0">
              <h3 className="text-[14px] font-[500] text-[#111111]">{ch.title}</h3>
              <p className="mt-0.5 text-[12px] text-[#626260]">{ch.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
