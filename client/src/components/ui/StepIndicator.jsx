import { Check } from 'lucide-react'

const labels = ['Choose Date', 'Pick Time', 'Your Details']

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full max-w-xl overflow-hidden">
      <ol className="flex items-start justify-between gap-2" aria-label="Booking progress">
        {[0, 1, 2].map((i) => {
          const n = i + 1
          const isActive = currentStep === n
          const isComplete = currentStep > n
          return (
            <li key={n} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <span
                    className={`h-px flex-1 ${currentStep > i ? 'bg-sage-mid' : 'bg-white/20'}`}
                    aria-hidden
                  />
                )}
                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition sm:h-10 sm:w-10 ${
                    isComplete
                      ? 'bg-sage-mid text-white'
                      : isActive
                        ? 'bg-white text-sage-deep'
                        : 'border-2 border-white/40 bg-transparent text-sage-300'
                  }`}
                >
                  {isComplete ? <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden /> : n}
                </span>
                {i < 2 && (
                  <span
                    className={`h-px flex-1 ${currentStep > n ? 'bg-sage-mid' : 'bg-white/20'}`}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={`mt-2 text-center text-[11px] font-medium leading-tight sm:text-xs ${
                  isActive || isComplete ? 'text-sage-100' : 'text-sage-400'
                }`}
              >
                {labels[i]}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
