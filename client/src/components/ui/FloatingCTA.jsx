import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { scrollToSection } from '../../utils/scroll'

const HERO_THRESHOLD = 300

export default function FloatingCTA() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)

  const update = useCallback(() => {
    if (pathname !== '/') {
      setShow(false)
      return
    }
    const pastHero = window.scrollY > HERO_THRESHOLD
    const bookingEl = document.getElementById('booking')
    let bookingVisible = false
    if (bookingEl) {
      const r = bookingEl.getBoundingClientRect()
      bookingVisible = r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15
    }
    setShow(pastHero && !bookingVisible)
  }, [pathname])

  useEffect(() => {
    const id = requestAnimationFrame(() => update())
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    const bookingEl = document.getElementById('booking')
    const obs = bookingEl
      ? new IntersectionObserver(update, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] })
      : null
    if (bookingEl && obs) obs.observe(bookingEl)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      obs?.disconnect()
    }
  }, [update])

  if (pathname !== '/' || !show) return null

  return (
    <div className="fixed bottom-6 right-6 z-[55] md:bottom-8 md:right-8">
      <button
        type="button"
        onClick={() => scrollToSection('booking')}
        className="floating-cta-pulse inline-flex items-center gap-2 rounded-full bg-sage-mid px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sage-600 hover:shadow-xl focus-visible:ring-offset-surface"
        aria-label="Book a free consultation"
      >
        <Calendar className="h-5 w-5 shrink-0" aria-hidden />
        Book now
      </button>
    </div>
  )
}
