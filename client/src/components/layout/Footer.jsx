import { Link } from 'react-router-dom'

const quick = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'social', label: 'Connect' },
  { id: 'booking', label: 'Book' },
]

export default function Footer() {
  return (
    <footer className="border-t border-sage-800 bg-ink text-sage-300">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-sage-100">
              <span className="font-display text-xl font-semibold">Nutrishita</span>
              <span className="ml-1.5 font-sans text-base font-light">by Akshita</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-sage-400">
              Evidence-based clinical nutrition — warm, human care.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sage-500">Quick links</p>
            <ul className="mt-4 space-y-2">
              {quick.map(({ id, label }) => (
                <li key={id}>
                  <Link to={`/#${id}`} className="text-sm text-sage-300 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="rounded-2xl bg-sage-deep p-6 text-sage-100 shadow-inner">
              <p className="font-display text-lg font-medium">Book a consultation</p>
              <p className="mt-2 text-sm text-sage-200">Complimentary 30-minute discovery call.</p>
              <Link
                to="/"
                state={{ scrollToBooking: true }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Schedule now
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-sage-800 pt-8 text-center text-xs text-sage-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} Nutrishita by Akshita. All rights reserved.</p>
          <p>Designed with care for your health</p>
        </div>
      </div>
    </footer>
  )
}
