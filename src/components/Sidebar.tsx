import { NavLink } from 'react-router-dom'
import { books } from '../data'
import { useProgressStore } from '../stores/progressStore'

export function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-r border-slate-200 bg-white overflow-y-auto h-screen sticky top-0">
      {/* Header */}
      <div className="px-5 py-5 border-b border-slate-100">
        <NavLink to="/" className="flex items-center gap-2 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-sky-400 to-blue-500 text-sm font-bold text-white shadow-sm">
            E
          </span>
          <div>
            <p className="text-base font-bold text-slate-800 leading-tight">English Handbook</p>
            <p className="text-[11px] text-slate-400 leading-tight">American Tech English</p>
          </div>
        </NavLink>
      </div>

      <nav className="p-3">
        {/* Navigation items */}
        <div className="space-y-0.5">
          <NavItem to="/" label="📊 首页" />
          <NavItem to="/search" label="🔍 搜索" />
          <NavItem to="/favorites" label="❤️ 收藏" />
        </div>

        <div className="my-4 border-t border-slate-100" />

        {/* Books */}
        <div className="space-y-3">
          {books.map((book) => (
            <BookSection key={book.id} bookId={book.id} title={book.title} />
          ))}
        </div>
      </nav>
    </aside>
  )
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 no-underline ${
          isActive
            ? 'bg-linear-to-r from-sky-50 to-blue-50 text-sky-700 border border-sky-100'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
        }`
      }
    >
      <span>{label}</span>
    </NavLink>
  )
}

function BookSection({ bookId }: { bookId: string; title: string }) {
  const book = books.find((b) => b.id === bookId)
  if (!book) return null

  return (
    <div>
      <NavLink
        to={`/books/${bookId}`}
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 no-underline ${
            isActive
              ? 'bg-linear-to-r from-sky-50 to-blue-50 text-sky-700 border border-sky-100'
              : 'text-slate-600 hover:bg-slate-50 border border-transparent'
          }`
        }
      >
        {book.title}
      </NavLink>
      <div className="ml-1 mt-1 space-y-0.5 border-l-2 border-slate-100 pl-2">
        {book.chapters.map((ch) => (
          <ChapterLink key={ch.id} chapterId={ch.id} title={ch.title} count={ch.count} />
        ))}
      </div>
    </div>
  )
}

function ChapterLink({
  chapterId,
  title,
  count,
}: {
  chapterId: string
  title: string
  count: number
}) {
  const { getChapterProgress } = useProgressStore()
  const { done } = getChapterProgress(chapterId, count)

  return (
    <NavLink
      to={`/chapters/${chapterId}`}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-all duration-150 no-underline ${
          isActive
            ? 'bg-sky-50 text-sky-700 font-medium'
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
        }`
      }
    >
      <span className="truncate">{title}</span>
      {done > 0 && (
        <span className="ml-2 shrink-0 flex items-center gap-1 text-emerald-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px]">{done}/{count}</span>
        </span>
      )}
    </NavLink>
  )
}
