import { NavLink } from 'react-router-dom'
import { books } from '../data'
import { useProgressStore } from '../stores/progressStore'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const linkClick = () => onClose?.()

  return (
    <aside className="w-64 shrink-0 border-r border-[#e8e8ed] bg-white overflow-y-auto h-screen sticky top-0 md:h-screen">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-[#f0f0f2]">
        <NavLink to="/" onClick={linkClick} className="flex items-center gap-2.5 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#0071e3] text-sm font-semibold text-white">
            E
          </span>
          <div>
            <p className="text-[14px] font-semibold text-[#1d1d1f] leading-tight">English Handbook</p>
            <p className="text-[11px] text-[#86868b] leading-tight mt-px">American Tech English</p>
          </div>
        </NavLink>
      </div>

      <nav className="px-3 pt-3">
        <div className="space-y-0.5">
          <NavItem to="/" label="📊 首页" onClick={linkClick} />
          <NavItem to="/search" label="🔍 搜索" onClick={linkClick} />
          <NavItem to="/favorites" label="❤️ 收藏" onClick={linkClick} />
        </div>

        <div className="my-4 mx-2 h-px bg-[#f0f0f2]" />

        <div className="space-y-2">
          {books.map((book) => (
            <BookSection key={book.id} bookId={book.id} title={book.title} onClick={linkClick} />
          ))}
        </div>
      </nav>
    </aside>
  )
}

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-[10px] px-3 py-2 text-[14px] font-medium transition-all duration-150 no-underline ${
          isActive
            ? 'bg-[#f5f5f7] text-[#0071e3]'
            : 'text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
        }`
      }
    >
      <span>{label}</span>
    </NavLink>
  )
}

function BookSection({ bookId, title, onClick }: { bookId: string; title: string; onClick?: () => void }) {
  const book = books.find((b) => b.id === bookId)
  if (!book) return null

  return (
    <div>
      <NavLink
        to={`/books/${bookId}`}
        onClick={onClick}
        className={({ isActive }) =>
          `block rounded-[10px] px-3 py-2 text-[13px] font-semibold transition-all duration-150 no-underline ${
            isActive
              ? 'bg-[#f5f5f7] text-[#0071e3]'
              : 'text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]'
          }`
        }
      >
        {title}
      </NavLink>
      <div className="ml-2 mt-0.5 space-y-0.5">
        {book.chapters.map((ch) => (
          <ChapterLink key={ch.id} chapterId={ch.id} title={ch.title} count={ch.count} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}

function ChapterLink({
  chapterId,
  title,
  count,
  onClick,
}: {
  chapterId: string
  title: string
  count: number
  onClick?: () => void
}) {
  const { getChapterProgress } = useProgressStore()
  const { done } = getChapterProgress(chapterId, count)

  return (
    <NavLink
      to={`/chapters/${chapterId}`}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] transition-all duration-150 no-underline ${
          isActive
            ? 'bg-[#f5f5f7] text-[#0071e3] font-medium'
            : 'text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
        }`
      }
    >
      <span className="truncate">{title}</span>
      {done > 0 && (
        <span className="ml-2 shrink-0 flex items-center gap-1 text-[#0071e3] text-[12px] font-medium">
          <span className="w-1 h-1 rounded-full bg-[#0071e3]" />
          <span>{done}/{count}</span>
        </span>
      )}
    </NavLink>
  )
}
