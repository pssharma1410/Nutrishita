import { ArrowDownRight } from 'lucide-react'
import FadeUp from '../ui/FadeUp'
import { scrollToSection } from '../../utils/scroll'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pb-14 pt-24 sm:pt-28 md:pb-24 md:pt-36">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-sage-100/30 blur-3xl"
        style={{ opacity: 0.3 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sage-100/40 blur-[120px]"
        aria-hidden
      />

      <FadeUp
        stagger
        className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16"
      >
        <div className="fade-up flex flex-col">
          <p className="eyebrow mb-4">Evidence-Based Nutrition Consulting</p>
          <h1 className="hero-title max-w-2xl text-[34px] leading-[1.08] sm:text-[40px] md:text-[64px] md:leading-[72px]">
            Your path to lasting health starts with the right guidance.
          </h1>
          <div className="mt-6">
            <span className="inline-flex rounded-full bg-sage-100 px-4 py-2 font-sans text-sm font-medium text-sage-700">
              PGD Dietetics &amp; PHN · MSc N&amp;D
            </span>
          </div>
          <p className="mt-6 max-w-xl text-sage-800">
            Science-backed, personalised nutrition plans — designed around your body, your goals, and your life.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="inline-flex items-center justify-center rounded-full bg-sage-mid px-6 py-3.5 text-base font-semibold text-white shadow-md transition duration-200 hover:bg-sage-600 hover:shadow-lg sm:px-8"
            >
              Book Free Consultation
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3.5 text-base font-semibold text-sage-800 shadow-sm transition duration-200 hover:border-sage-mid/40 hover:bg-white"
            >
              Learn more
              <ArrowDownRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="fade-up relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none" aria-hidden>
          <div className="relative flex justify-center lg:justify-end">
            <svg
              className="h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px]"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="blobGrad" x1="40" y1="60" x2="360" y2="340" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#97c9b8" />
                  <stop offset="0.5" stopColor="#4a7c68" />
                  <stop offset="1" stopColor="#0e2d25" />
                </linearGradient>
              </defs>
              <path
                fill="url(#blobGrad)"
                d="M320 180c32 88-24 182-112 198C108 396 12 320 8 220 4 120 72 36 168 24c96-12 196 24 152 156z"
              />
            </svg>
            <div className="animate-hero-float absolute bottom-4 left-1/2 w-[min(100%,260px)] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-xl md:bottom-10 md:w-[260px] md:p-5">
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-sage-300 to-sage-mid"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-sage-500">Next session</p>
                  <p className="truncate font-sans text-sm font-semibold text-sage-800">Today · 11:00 AM</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-sage-100">
                <div className="h-full w-2/3 rounded-full bg-sage-mid" />
              </div>
              <p className="mt-3 font-sans text-xs font-medium text-sage-600">Meal plan updated ✓</p>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
