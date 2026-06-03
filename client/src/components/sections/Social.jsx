import { Camera, Video } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const masonryHeights = ['h-16', 'h-24', 'h-20', 'h-14', 'h-24', 'h-16', 'h-20', 'h-14', 'h-16']

export default function Social() {
  return (
    <section id="social" className="scroll-mt-28 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="text-center">
          <p className="eyebrow">Community</p>
          <h2 className="section-title mx-auto mt-4 max-w-2xl text-ink">Follow the journey</h2>
        </FadeUp>

        <FadeUp stagger className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="fade-up group rounded-2xl border border-border bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="rounded-[calc(1rem-2px)] bg-gradient-to-br from-pink-400 via-purple-400 to-amber-300 p-[1px]">
              <div className="rounded-[calc(1rem-3px)] bg-white p-6">
                <div className="flex items-center gap-2 text-pink-600">
                  <Camera className="h-6 w-6" aria-hidden />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider">Instagram</span>
                </div>
                <p className="mt-3 font-display text-xl font-semibold text-ink">@nutrishita</p>
                <p className="mt-2 text-sm text-sage-700">Follow for daily nutrition tips</p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {masonryHeights.map((h, i) => (
                    <div
                      key={i}
                      className={`rounded-lg bg-sage-100 ${h} ${i % 3 === 1 ? 'translate-y-1' : i % 3 === 2 ? '-translate-y-0.5' : ''}`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="fade-up group rounded-2xl border border-border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-2 text-red-600">
              <Video className="h-7 w-7" aria-hidden />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">YouTube</span>
            </div>
            <p className="mt-3 font-display text-xl font-semibold text-ink">Nutrishita by Akshita</p>
            <p className="mt-2 text-sm text-sage-700">Watch free nutrition guides</p>
            <div className="mt-6 grid gap-4">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="relative aspect-video overflow-hidden rounded-xl bg-sage-50 shadow-inner"
                  aria-hidden
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-sage-mid shadow-md ring-2 ring-sage-100">
                      <span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-sage-mid" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </FadeUp>
      </div>
    </section>
  )
}
