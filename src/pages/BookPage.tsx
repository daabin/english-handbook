import { useParams, Link } from 'react-router-dom'
import { books } from '../data'

export function BookPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find((b) => b.id === bookId)

  if (!book) {
    return (
      <div className="px-4 py-8">
        <p className="text-[#86868b]">书籍未找到</p>
        <Link to="/" className="text-sm text-[#0071e3]">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[640px] px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
      <div className="flex items-center gap-1.5 text-[13px] text-[#86868b] mb-6">
        <Link to="/" className="no-underline text-[#86868b] hover:text-[#0071e3] transition-colors">首页</Link>
        <span className="text-[#c7c7cc]">/</span>
        <span className="text-[#1d1d1f] font-medium">{book.title}</span>
      </div>

      <h1 className="text-[24px] sm:text-[32px] font-[700] text-[#1d1d1f] leading-tight tracking-[-0.02em] mb-1">{book.title}</h1>
      <p className="text-[15px] sm:text-lg text-[#86868b] mb-6 sm:mb-8">{book.description}</p>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {book.chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/chapters/${ch.id}`}
            className="block rounded-[16px] sm:rounded-2xl bg-white shadow-sm border border-[#e8e8ed] px-4 sm:px-6 py-4 sm:py-5 no-underline transition-all hover:shadow-md hover:border-[#0071e3]/20"
          >
            <div className="flex items-center gap-3 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] sm:rounded-xl bg-[#f5f5f7] text-[#0071e3] font-bold text-[12px] sm:text-sm">
                {ch.count}
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] sm:text-base font-[700] text-[#1d1d1f]">{ch.title}</h3>
                <p className="mt-0.5 text-[12px] sm:text-sm text-[#86868b]">{ch.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
