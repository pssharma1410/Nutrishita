import { Activity, Leaf, MessageCircle, Scale } from 'lucide-react'
import FadeUp from '../ui/FadeUp'
import { scrollToSection } from '../../utils/scroll'

const services = [
  {
    title: 'Weight management',
    desc: 'Structured energy balance and maintenance strategies without fad dieting or shame.',
    icon: Scale,
    included: [
      'Body composition & lifestyle review',
      'Sustainable meal frameworks',
      'Ongoing accountability check-ins',
    ],
  },
  {
    title: 'Clinical nutrition',
    desc: 'Support for diabetes, lipids, GI, PCOS, renal considerations, and complex medical cases.',
    icon: Activity,
    included: ['MNT-aligned protocols', 'Lab-aware guidance', 'Care team documentation'],
  },
  {
    title: 'Lifestyle diet plans',
    desc: 'Meal patterns, grocery frameworks, and travel-friendly routines built for the long term.',
    icon: Leaf,
    included: ['Personalised meal timing', 'Shopping & prep guides', 'Realistic portion tools'],
  },
  {
    title: 'Custom consultation',
    desc: 'Focused sessions for athletes, pregnancy, family feeding, or multi-goal cases.',
    icon: MessageCircle,
    included: ['Goal prioritisation', 'Action plan handouts', 'Email summary after session'],
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-warm-cream py-16 md:scroll-mt-28 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeUp className="text-center">
          <p className="eyebrow">Services</p>
          <h2 className="section-title mx-auto mt-4 max-w-2xl text-ink">How we can work together</h2>
        </FadeUp>

        <FadeUp stagger className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((s) => (
            <article
              key={s.title}
              className="fade-up group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sage-mid hover:shadow-xl md:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-mid">
                <s.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="card-title mt-5 text-ink">{s.title}</h3>
              <p className="mt-3 flex-1 text-sage-800">{s.desc}</p>
              <div className="mt-4 max-h-40 overflow-hidden transition-[max-height] duration-300 ease-out md:max-h-0 md:group-hover:max-h-32 md:group-focus-within:max-h-32">
                <p className="pt-1 font-sans text-xs font-semibold uppercase tracking-wide text-sage-500">
                  What&apos;s included:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 font-sans text-sm text-sage-700">
                  {s.included.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-6 w-fit text-left font-sans text-sm font-semibold text-sage-mid transition hover:underline"
                onClick={() => scrollToSection('booking')}
              >
                Learn more →
              </button>
            </article>
          ))}

          <div className="fade-up flex flex-col justify-between rounded-2xl bg-sage-deep p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
            <div>
              <h3 className="font-display text-xl font-medium">Not sure which plan fits you?</h3>
              <p className="mt-3 text-sm leading-relaxed text-sage-100">
                Book a free 20-minute discovery call — we&apos;ll clarify goals and next steps together.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Book discovery call
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
