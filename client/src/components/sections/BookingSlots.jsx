import { CalendarX, Check } from 'lucide-react'
import { SkeletonSlotGrid } from '../ui/SkeletonSlot'
import { ALL_SLOTS } from '../../constants/slots'
import { formatSlotLabel } from '../../utils/slotDisplay'

/**
 * @param {object} props
 * @param {string} props.date YYYY-MM-DD
 * @param {boolean} props.loading
 * @param {string} props.errorMessage
 * @param {string[]} props.available
 * @param {string[]} props.booked
 * @param {string} props.selectedTime
 * @param {(t: string) => void} props.onSelectTime
 */
export default function BookingSlots({
  loading,
  errorMessage,
  available,
  booked,
  selectedTime,
  onSelectTime,
}) {
  const availableSet = new Set(available || [])
  const bookedSet = new Set(booked || [])

  return (
    <div>
      <p className="text-sm font-medium text-sage-200">Available times</p>
      <p className="mt-1 text-xs text-sage-400">All times in IST · 30 min session</p>
      {loading && (
        <div className="mt-4">
          <SkeletonSlotGrid count={6} />
        </div>
      )}
      {!loading && errorMessage && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}
      {!loading && !errorMessage && (
        <div className="mt-4">
          {ALL_SLOTS.every((t) => !availableSet.has(t)) ? (
            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-center">
              <CalendarX className="h-10 w-10 text-sage-400" aria-hidden />
              <p className="mt-3 max-w-xs text-sm text-sage-200">
                No slots on this date — please try another.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="list">
              {ALL_SLOTS.map((t) => {
                const isBooked = bookedSet.has(t)
                const isAvail = availableSet.has(t)
                const unavailable = !isAvail && !isBooked
                const isSelected = selectedTime === t
                const disabled = isBooked || unavailable

                return (
                  <button
                    key={t}
                    type="button"
                    role="listitem"
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled && isAvail) onSelectTime(t)
                    }}
                    className={`flex min-h-[40px] items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition focus-ring-invert ${
                      disabled
                        ? 'cursor-not-allowed border-white/10 bg-transparent text-sage-400 opacity-30 line-through'
                        : isSelected
                          ? 'border-sage-mid bg-sage-mid text-white shadow-md'
                          : 'border-white/20 bg-transparent text-sage-100 hover:bg-white/10'
                    }`}
                  >
                    {isSelected && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                    {formatSlotLabel(t)}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
