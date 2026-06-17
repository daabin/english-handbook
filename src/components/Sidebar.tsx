import { NavLink } from 'react-router-dom'
import { books } from '../data'
import { useProgressStore } from '../stores/progressStore'
import { useSpeechStore } from '../stores/speechStore'
import { useFilterStore } from '../stores/filterStore'
import type { SpeechRate } from '../stores/speechStore'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const linkClick = () => onClose?.()

  return (
    <aside className="w-72 shrink-0 bg-white border-r border-[#d3cec6] overflow-y-auto h-full md:h-screen">
      {/* Header */}
      <div className="px-5 pt-6 pb-5 border-b border-[#ebe7e1]">
        <NavLink to="/" onClick={linkClick} className="flex items-center gap-3 no-underline">
          <span
            className="flex h-8 w-8 items-center justify-center bg-[#111111] text-[13px] font-[500] text-white"
            style={{ borderRadius: 6 }}
          >
            E
          </span>
          <div>
            <p className="text-[15px] font-[500] text-[#111111] leading-tight tracking-[-0.2px]">English Handbook</p>
            <p className="text-[11px] text-[#626260] leading-tight mt-px">American Tech English</p>
          </div>
        </NavLink>
      </div>

      <nav className="px-3 pt-4">
        {/* Nav items */}
        <div className="space-y-0.5">
          <NavItem to="/" label="Dashboard" onClick={linkClick} />
          <NavItem to="/search" label="Search" onClick={linkClick} />
          <NavItem to="/favorites" label="Favorites" onClick={linkClick} />
        </div>

        <div className="my-5 mx-2 hairline" />

        {/* Speech rate */}
        <div className="mx-2 mb-5">
          <p className="text-[12px] text-[#7b7b78] font-[400] mb-2.5">Speech speed</p>
          <div className="flex gap-1.5">
            {([0.5, 0.75, 1] as SpeechRate[]).map((v) => (
              <RateButton key={v} value={v} label={v === 0.5 ? 'Slow' : v === 0.75 ? 'Med' : 'Normal'} />
            ))}
          </div>
        </div>

        <div className="mx-2 my-5 hairline" />

        {/* Hide completed toggle */}
        <div className="mx-2 mb-5">
          <HideCompletedToggle />
        </div>

        <div className="mx-2 my-5 hairline" />

        {/* Books */}
        <div className="mt-5 space-y-4">
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
        `block px-3 py-2 text-[14px] font-[500] transition-all duration-150 no-underline ${
          isActive
            ? 'bg-[#f5f1ec] text-[#111111]'
            : 'text-[#626260] hover:bg-[#f5f1ec] hover:text-[#111111]'
        }`
      }
      style={{ borderRadius: 8 }}
    >
      {label}
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
          `block px-3 py-1.5 text-[13px] font-[500] transition-all duration-150 no-underline ${
            isActive
              ? 'bg-[#f5f1ec] text-[#111111]'
              : 'text-[#111111] hover:bg-[#f5f1ec]'
          }`
        }
        style={{ borderRadius: 8 }}
      >
        {title}
      </NavLink>
      <div className="ml-0 mt-0.5">
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
        `flex items-center justify-between px-3 py-1.5 text-[13px] font-[400] transition-all duration-150 no-underline ${
          isActive
            ? 'bg-[#f5f1ec] text-[#111111]'
            : 'text-[#7b7b78] hover:bg-[#f5f1ec] hover:text-[#111111]'
        }`
      }
      style={{ borderRadius: 8 }}
    >
      <span className="truncate">{title}</span>
      {done > 0 && (
        <span className="ml-2 shrink-0 text-[11px] text-[#626260] tabular-nums">
          {done}/{count}
        </span>
      )}
    </NavLink>
  )
}

function RateButton({ value, label }: { value: SpeechRate; label: string }) {
  const { rate, setRate } = useSpeechStore()
  const active = rate === value
  return (
    <button
      onClick={() => setRate(value)}
      className={`flex-1 py-1.5 text-[12px] font-[500] transition-all duration-150 ${
        active
          ? 'bg-[#111111] text-white'
          : 'bg-[#ebe7e1] text-[#626260] hover:bg-[#d3cec6] hover:text-[#111111]'
      }`}
      style={{ borderRadius: 6 }}
    >
      {label}
    </button>
  )
}

function HideCompletedToggle() {
  const hideCompleted = useFilterStore((s) => s.hideCompleted)
  const toggle = useFilterStore((s) => s.toggleHideCompleted)
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-[12px] text-[#7b7b78] font-[400]">Hide completed</span>
      <span
        onClick={toggle}
        className={`relative inline-block w-8 h-[18px] transition-colors duration-150 ${
          hideCompleted ? 'bg-[#111111]' : 'bg-[#d3cec6]'
        }`}
        style={{ borderRadius: 9 }}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-white transition-transform duration-150 ${
            hideCompleted ? 'translate-x-[14px]' : ''
          }`}
          style={{ borderRadius: 7 }}
        />
      </span>
    </label>
  )
}
