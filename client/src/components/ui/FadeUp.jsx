import { Children, cloneElement, isValidElement, useEffect, useRef } from 'react'

/**
 * IntersectionObserver adds `data-visible` for CSS `.fade-up` transitions.
 * Stagger: pass `stagger` and children get --fade-delay: (index * 0.1s).
 */
export default function FadeUp({
  children,
  className = '',
  as: Comp = 'div',
  stagger = false,
  threshold = 0.12,
  rootMargin = '0px 0px -48px 0px',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      root.setAttribute('data-visible', 'true')
      const items = root.querySelectorAll('.fade-up')
      items.forEach((el) => el.setAttribute('data-visible', 'true'))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.setAttribute('data-visible', 'true')
            const items = en.target.querySelectorAll('.fade-up')
            items.forEach((el) => el.setAttribute('data-visible', 'true'))
            obs.unobserve(en.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    obs.observe(root)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  const content = stagger
    ? Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        const delay = `${i * 0.1}s`
        return cloneElement(child, {
          key: child.key ?? i,
          className: [child.props.className, 'fade-up'].filter(Boolean).join(' '),
          style: { ...child.props.style, '--fade-delay': delay },
        })
      })
    : (
        <div className="fade-up">
          {children}
        </div>
      )

  return (
    <Comp ref={ref} className={className}>
      {content}
    </Comp>
  )
}
