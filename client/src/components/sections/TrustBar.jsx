import { BookOpen, FileText, Heart, User } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const items = [
  { icon: BookOpen, label: 'Evidence-Based Plans' },
  { icon: User, label: '1:1 Personalised Coaching' },
  { icon: FileText, label: 'Physician-Ready Documentation' },
  { icon: Heart, label: 'Non-Judgmental Approach' },
]

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-warm-cream py-8 md:py-10" aria-label="Trust signals">
      <FadeUp className="mx-auto max-w-6xl px-6">
        <div className="hidden items-center justify-center gap-6 md:flex md:flex-wrap lg:gap-10">
          {items.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-3">
              {i > 0 && (
                <span className="hidden h-1 w-1 shrink-0 rounded-full bg-sage-300 lg:inline" aria-hidden />
              )}
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-mid">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-sans text-sm font-medium text-sage-800">{label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-sage-mid">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-sans text-xs font-medium leading-snug text-sage-800">{label}</span>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  )
}
