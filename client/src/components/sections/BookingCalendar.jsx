import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { todayYMD } from '../../utils/datetime'

const pad = (n) => String(n).padStart(2, '0')

/**
 * @param {string} value YYYY-MM-DD
 * @param {(ymd: string) => void} onChange
 * @param {string} minDate YYYY-MM-DD
 */
export default function BookingCalendar({ value, onChange, minDate }) {
  const [view, setView] = useState(() => {
    const [y, m] = value.split('-').map(Number)
    return { y, m: m - 1 }
  })

  useEffect(() => {
    const [y, m] = value.split('-').map(Number)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync calendar month when selected date changes
    setView({ y, m: m - 1 })
  }, [value])

  const { label, cells } = useMemo(() => {
    const y = view.y
    const m = view.m
    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7
    const daysInMonth = new Date(y, m + 1, 0).getDate()
    const monthLabel = new Date(y, m, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' })
    const list = []
    for (let i = 0; i < firstDow; i++) list.push({ type: 'pad' })
    for (let d = 1; d <= daysInMonth; d++) {
      const ymd = `${y}-${pad(m + 1)}-${pad(d)}`
      list.push({ type: 'day', day: d, ymd })
    }
    while (list.length % 7 !== 0) list.push({ type: 'pad' })
    return { label: monthLabel, cells: list }
  }, [view])

  function prevMonth() {
    setView((v) => {
      const nm = v.m - 1
      if (nm < 0) return { y: v.y - 1, m: 11 }
      return { y: v.y, m: nm }
    })
  }

  function nextMonth() {
    setView((v) => {
      const nm = v.m + 1
      if (nm > 11) return { y: v.y + 1, m: 0 }
      return { y: v.y, m: nm }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={prevMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-ring-invert"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <p className="font-display text-lg font-medium text-white">{label}</p>
        <button
          type="button"
          onClick={nextMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-ring-invert"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-sage-400">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (cell.type === 'pad') {
            return <div key={`p-${idx}`} className="h-10 w-10" aria-hidden />
          }
          const { ymd } = cell
          const isPast = ymd < minDate
          const isToday = ymd === todayYMD()
          const isSelected = ymd === value
          return (
            <button
              key={ymd}
              type="button"
              disabled={isPast}
              onClick={() => onChange(ymd)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition focus-ring-invert ${
                isPast
                  ? 'cursor-not-allowed text-sage-600 line-through opacity-40'
                  : isSelected
                    ? 'bg-sage-mid text-white shadow-md'
                    : isToday
                      ? 'ring-2 ring-sage-mid ring-offset-2 ring-offset-sage-deep text-white'
                      : 'bg-white/10 text-sage-100 hover:bg-white/20'
              }`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
      <p className="mt-4 text-sm text-sage-300">Tap a date to see available slots</p>
    </div>
  )
}
