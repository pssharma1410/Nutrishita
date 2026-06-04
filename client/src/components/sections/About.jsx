import FadeUp from '../ui/FadeUp'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-16 md:scroll-mt-28 md:py-32">
      <FadeUp
        stagger
        className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-start md:gap-16"
      >
        <div className="fade-up">
          <p className="eyebrow">About</p>
          <h2 className="section-title mt-4 text-ink">Meet your dietitian</h2>
          <p className="mt-6 text-sage-800">
            I work with adults and families who want structured, compassionate guidance — whether you are managing a
            medical condition, improving energy, or building habits that last. Every plan is built from your history,
            preferences, and real-life constraints.
          </p>
          <p className="mt-4 text-sage-800">
            Consultations blend medical nutrition therapy with practical coaching: clear Education, realistic meal
            patterns, and follow-up that keeps you supported — not overwhelmed.
          </p>
          <p className="mt-4 text-sage-800">
            You will leave sessions with a roadmap you can follow, documentation you can share with your care team, and
            the confidence that your nutrition plan is grounded in evidence — not trends.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['8+ Years Experience', '500+ Clients', 'Evidence-Based'].map((t) => (
              <span
                key={t}
                className="inline-flex rounded-full border border-border bg-sage-50 px-4 py-2 font-sans text-sm font-medium text-sage-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="fade-up">
          <div className="rounded-3xl bg-sage-50 p-6 md:p-10">
            <blockquote className="border-l-[3px] border-sage-mid pl-5 font-display text-lg italic leading-relaxed text-sage-800 md:pl-6 md:text-2xl">
              “My role is to listen first — then translate science into a plan that respects your life, your culture, and
              your goals.”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-2">
              {['PGD Dietetics & PHN', 'MSc Nutrition & Dietetics', 'Clinical MNT'].map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-white/80 px-3 py-1.5 font-sans text-xs font-medium text-sage-700 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
