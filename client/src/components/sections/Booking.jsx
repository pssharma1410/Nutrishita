import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSlots, submitBooking } from '../../services/bookingApi'
import { todayYMD } from '../../utils/datetime'
import { validateBookingFields } from '../../utils/bookingFormValidation'
import FadeUp from '../ui/FadeUp'
import StepIndicator from '../ui/StepIndicator'
import BookingCalendar from './BookingCalendar'
import BookingSlots from './BookingSlots'
import BookingForm from './BookingForm'

const STORAGE_KEY = 'nutrishita-booking-draft'

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return typeof data === 'object' && data ? data : null
  } catch {
    return null
  }
}

export default function Booking() {
  const navigate = useNavigate()
  const [bookingStep, setBookingStep] = useState(1)

  const [date, setDate] = useState(todayYMD)
  const [selectedTime, setSelectedTime] = useState('')

  const initialFields = useMemo(() => {
    const d = loadDraft()
    return {
      name: typeof d?.name === 'string' ? d.name : '',
      email: typeof d?.email === 'string' ? d.email : '',
      phone: typeof d?.phone === 'string' ? d.phone : '',
      notes: typeof d?.notes === 'string' ? d.notes : '',
    }
  }, [])

  const [name, setName] = useState(initialFields.name)
  const [email, setEmail] = useState(initialFields.email)
  const [phone, setPhone] = useState(initialFields.phone)
  const [notes, setNotes] = useState(initialFields.notes)

  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [available, setAvailable] = useState([])
  const [booked, setBooked] = useState([])

  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formShake, setFormShake] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, phone, notes }))
    } catch {
      /* ignore quota */
    }
  }, [name, email, phone, notes])

  const loadSlots = useCallback(async (ymd) => {
    setSlotsError('')
    setSlotsLoading(true)
    setSelectedTime('')
    try {
      const data = await fetchSlots(ymd)
      if (!data.ok) throw new Error(data.message || 'Could not load slots')
      setAvailable(data.available || [])
      setBooked(data.booked || [])
    } catch (e) {
      const msg = e.response?.data?.message || e.message || 'Could not load slots'
      setSlotsError(msg)
      setAvailable([])
      setBooked([])
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load availability when date changes
    loadSlots(date)
  }, [date, loadSlots])

  function setDateSafe(ymd) {
    setDate(ymd)
    setSelectedTime('')
  }

  function onFormChange(e) {
    const { name: field, value } = e.target
    if (field === 'name') setName(value)
    else if (field === 'email') setEmail(value)
    else if (field === 'phone') setPhone(value)
    else if (field === 'notes') setNotes(value)
  }

  async function onConfirm(e) {
    e.preventDefault()
    setSubmitError('')
    const err = validateBookingFields({ name, email, phone })
    setFieldErrors(err)
    if (Object.keys(err).length > 0) {
      setFormShake(true)
      window.setTimeout(() => setFormShake(false), 450)
      return
    }

    setSubmitting(true)
    try {
      const res = await submitBooking({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        time: selectedTime,
      })
      if (!res.ok) throw new Error(res.message || 'Booking failed')
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      navigate('/booking-confirmed', {
        replace: true,
        state: {
          date: res.booking.date,
          time: res.booking.time,
          email: res.booking.email,
          meetingLink: res.booking.meetingLink,
        },
      })
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || 'Something went wrong. Please try again.'
      setSubmitError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="booking" className="relative scroll-mt-24 overflow-hidden bg-sage-deep py-16 text-white md:scroll-mt-28 md:py-32">
      <div className="booking-grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeUp className="max-w-2xl">
          <p className="eyebrow text-sage-300">Appointment</p>
          <h2 className="section-title mt-4 text-white">Book your complimentary consultation</h2>
          <p className="mt-4 text-base text-sage-200 md:text-lg">
            Select a date, choose a time, and confirm your details. You&apos;ll receive your calendar invite by email.
          </p>
        </FadeUp>

        <FadeUp className="mt-8 md:mt-12">
          <StepIndicator currentStep={bookingStep} />
        </FadeUp>

        <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:p-6 md:mt-12 md:rounded-3xl md:p-10">
          {bookingStep > 1 && (
            <button
              type="button"
              onClick={() => setBookingStep((s) => Math.max(1, s - 1))}
              className="mb-8 text-sm font-medium text-sage-300 transition hover:text-white"
            >
              ← Back
            </button>
          )}

          {bookingStep === 1 && (
            <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <BookingCalendar value={date} onChange={setDateSafe} minDate={todayYMD()} />
              <div className="rounded-2xl border border-white/10 bg-sage-deep/40 p-5 text-sage-200 sm:p-6 lg:mt-10">
                <p className="font-display text-lg text-white">How it works</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
                  <li>Pick a weekday that suits you (Mon–Fri, 10:00–18:00 IST).</li>
                  <li>Choose a 30-minute slot.</li>
                  <li>Share your contact details — we&apos;ll confirm by email.</li>
                </ol>
              </div>
              <div className="flex justify-stretch lg:col-span-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="focus-ring-invert w-full rounded-full bg-sage-mid px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sage-600 sm:w-auto"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-8">
              <BookingSlots
                loading={slotsLoading}
                errorMessage={slotsError}
                available={available}
                booked={booked}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
              />
              <div className="flex flex-wrap items-center justify-stretch gap-3 sm:justify-end">
                <button
                  type="button"
                  disabled={!selectedTime || slotsLoading}
                  onClick={() => setBookingStep(3)}
                  className="focus-ring-invert w-full rounded-full bg-sage-mid px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sage-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <BookingForm
              name={name}
              email={email}
              phone={phone}
              notes={notes}
              fieldErrors={fieldErrors}
              submitError={submitError}
              submitting={submitting}
              shake={formShake}
              onChange={onFormChange}
              onSubmit={onConfirm}
            />
          )}
        </div>
      </div>
    </section>
  )
}
