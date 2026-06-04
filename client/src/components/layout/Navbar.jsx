import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '../../utils/scroll'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'social', label: 'Connect' },
  { id: 'booking', label: 'Book' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const trapRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu on route change
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const container = trapRef.current
    const focusables = container
      ? Array.from(
          container.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled'))
      : []

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    requestAnimationFrame(() => closeBtnRef.current?.focus())

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab' || focusables.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function go(id) {
    if (location.pathname !== '/') return
    scrollToSection(id)
    setOpen(false)
  }

  const headerBg = scrolled
    ? 'bg-white/95 shadow-sm backdrop-blur-md'
    : 'bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerBg}`}>
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4"
        aria-label="Primary"
      >
        <Link
          to="/"
          aria-label="Nutrishita by Akshita, home"
          className="inline-flex items-baseline gap-1.5 text-sage-deep transition-colors duration-200 hover:text-sage-700"
        >
          <span className="font-display text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">Nutrishita</span>
          <span className="font-sans text-xs font-light tracking-tight sm:text-sm md:text-base">by Akshita</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map(({ id, label }) => (
            <li key={id}>
              {location.pathname === '/' ? (
                <button
                  type="button"
                  onClick={() => go(id)}
                  className="nav-link-underline font-sans text-sm font-medium text-sage-700 transition-colors duration-200 hover:text-sage-mid"
                >
                  {label}
                </button>
              ) : (
                <Link
                  to={`/#${id}`}
                  className="nav-link-underline font-sans text-sm font-medium text-sage-700 transition-colors duration-200 hover:text-sage-mid"
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              to="/"
              state={{ scrollToBooking: true }}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault()
                  scrollToSection('booking')
                }
              }}
              className="inline-flex rounded-full bg-sage-mid px-5 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-sage-600 hover:shadow-md"
            >
              Book Free Consultation
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/90 text-ink shadow-sm transition hover:bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" ref={trapRef} className="fixed inset-0 z-[80] md:hidden">
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-2xl">
            <div className="flex justify-end p-4">
              <button
                ref={closeBtnRef}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-ink shadow-sm"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8 pb-16">
              {links.map(({ id, label }) => (
                <li key={id}>
                  {location.pathname === '/' ? (
                    <button
                      type="button"
                      className="w-full py-4 text-left font-sans text-2xl font-medium text-sage-800"
                      onClick={() => go(id)}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      to={`/#${id}`}
                      className="block py-4 font-sans text-2xl font-medium text-sage-800"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-6">
                <Link
                  to="/"
                  className="block rounded-full bg-sage-mid py-4 text-center font-sans text-lg font-semibold text-white shadow-lg"
                  onClick={(e) => {
                    setOpen(false)
                    if (location.pathname === '/') {
                      e.preventDefault()
                      requestAnimationFrame(() => scrollToSection('booking'))
                    }
                  }}
                >
                  Book Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
