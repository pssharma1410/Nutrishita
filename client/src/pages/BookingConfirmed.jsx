import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'

function buildGoogleCalendarUrl({ date, time }) {
  const [y, mo, d] = date.split('-').map(Number)
  const [h, mi] = time.split(':').map(Number)
  const start = new Date(y, mo - 1, d, h, mi)
  const end = new Date(start.getTime() + 30 * 60 * 1000)
  const fmt = (dt) => dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const text = encodeURIComponent('Nutrishita by Akshita — free consultation')
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${fmt(start)}/${fmt(end)}`
}

const confettiColors = [
  'var(--color-sage-mid)',
  'var(--color-sage-300)',
  'var(--color-sage-100)',
  'var(--color-ink)',
  'var(--color-sage-500)',
]

export default function BookingConfirmed() {
  const location = useLocation()
  const state = location.state
  const [showConfetti, setShowConfetti] = useState(true)

  const formatted = useMemo(() => {
    if (!state?.date || !state?.time) return null
    const [y, m, d] = state.date.split('-').map(Number)
    const dateObj = new Date(y, m - 1, d)
    const dateLabel = dateObj.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const [h, mi] = state.time.split(':').map(Number)
    const t = new Date(2000, 0, 1, h, mi)
    const timeLabel = t.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    return { dateLabel, timeLabel }
  }, [state])

  useEffect(() => {
    const t = window.setTimeout(() => setShowConfetti(false), 2000)
    return () => window.clearTimeout(t)
  }, [])

  if (!state?.date || !state?.time) {
    return <Navigate to="/" replace />
  }

  const gCal = buildGoogleCalendarUrl({ date: state.date, time: state.time })

  return (
    <main className="relative min-h-svh overflow-hidden bg-surface pb-16 pt-24 md:pb-20 md:pt-28">
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${5 + ((i * 17) % 90)}%`,
                bottom: '10%',
                backgroundColor: confettiColors[i % confettiColors.length],
                '--tx': `${(i % 5) * 8 - 16}px`,
                '--d': `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-20 mx-auto max-w-lg px-4 text-center sm:px-6 md:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
          <svg className="h-20 w-20 md:h-24 md:w-24" viewBox="0 0 64 64" fill="none" aria-hidden>
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="var(--color-sage-mid)"
              strokeWidth="2"
              fill="none"
              className="check-circle-anim"
            />
            <path
              d="M18 33l10 10 18-22"
              stroke="var(--color-sage-deep)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="check-path-anim"
            />
          </svg>
        </div>

        <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-ink md:mt-8 md:text-[42px]">
          You&apos;re all set!
        </h1>

        <p className="mt-3 text-sage-700">
          Your consultation is confirmed for{' '}
          <span className="font-semibold text-ink">{formatted?.dateLabel}</span> at{' '}
          <span className="font-semibold text-ink">{formatted?.timeLabel}</span>.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-white p-5 text-left shadow-lg sm:p-8 md:mt-10">
          <p className="text-sm text-sage-700">
            Check your inbox at{' '}
            <span className="font-semibold text-ink">{state.email}</span> for a calendar invite and meeting link.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={gCal}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-sage-mid px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-sage-600"
          >
            Add to Google Calendar
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-sage-mid/40"
          >
            Back to Home
          </Link>
        </div>

        {state.meetingLink && (
          <p className="mt-10">
            <a
              href={state.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-sage-mid underline-offset-4 hover:underline"
            >
              Open meeting link
            </a>
          </p>
        )}
      </div>
    </main>
  )
}
