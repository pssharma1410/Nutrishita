import { useId } from 'react'
import { Loader2, X } from 'lucide-react'

/**
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.email
 * @param {string} props.phone
 * @param {string} props.notes
 * @param {Record<string, string>} props.fieldErrors
 * @param {string} props.submitError
 * @param {boolean} props.submitting
 * @param {boolean} props.shake
 * @param {(e: React.ChangeEvent) => void} props.onChange
 * @param {(e: React.FormEvent) => void} props.onSubmit
 */
export default function BookingForm({
  name,
  email,
  phone,
  notes,
  fieldErrors,
  submitError,
  submitting,
  shake,
  onChange,
  onSubmit,
}) {
  const baseId = useId()

  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-5 ${shake ? 'animate-shake' : ''}`}
      noValidate
    >
      {submitError && (
        <div
          className="flex gap-3 rounded-xl border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-100"
          role="alert"
        >
          <X className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden />
          <p>{submitError}</p>
        </div>
      )}

      <p className="text-sm text-sage-200">
        We&apos;ll send a calendar invite + meeting link to your email
      </p>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <div className="md:col-span-1">
          <label htmlFor={`${baseId}-name`} className="block text-sm font-medium text-sage-200">
            Full name
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            value={name}
            onChange={onChange}
            autoComplete="name"
            className="focus-ring-invert mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-sage-400"
            placeholder="Your full name"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-300" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div className="md:col-span-1">
          <label htmlFor={`${baseId}-email`} className="block text-sm font-medium text-sage-200">
            Email
          </label>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            autoComplete="email"
            className="focus-ring-invert mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-sage-400"
            placeholder="you@example.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-300" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="md:col-span-1">
          <label htmlFor={`${baseId}-phone`} className="block text-sm font-medium text-sage-200">
            Phone
          </label>
          <input
            id={`${baseId}-phone`}
            name="phone"
            type="tel"
            value={phone}
            onChange={onChange}
            autoComplete="tel"
            className="focus-ring-invert mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-sage-400"
            placeholder="+91 …"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-xs text-red-300" role="alert">
              {fieldErrors.phone}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${baseId}-notes`} className="block text-sm font-medium text-sage-200">
            Notes{' '}
            <span className="font-normal text-sage-400">(optional)</span>
          </label>
          <textarea
            id={`${baseId}-notes`}
            name="notes"
            value={notes}
            onChange={onChange}
            rows={3}
            className="focus-ring-invert mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-sage-400"
            placeholder="Goals, dietary preferences, or questions for our session"
          />
          <p className="mt-1 text-xs text-sage-400">
            Saved on this device only — discussed live in your consultation.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="focus-ring-invert inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sage-mid py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-sage-600 disabled:cursor-not-allowed disabled:opacity-60"
        aria-busy={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            <span role="status">Confirming…</span>
          </>
        ) : (
          'Confirm Free Consultation'
        )}
      </button>
    </form>
  )
}
