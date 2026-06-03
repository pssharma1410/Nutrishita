import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ReadingProgress() {
  const { pathname } = useLocation()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (pathname !== '/') {
      requestAnimationFrame(() => setPct(0))
      return
    }

    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const height = doc.scrollHeight - doc.clientHeight
      const next = height <= 0 ? 0 : Math.min(100, (scrollTop / height) * 100)
      setPct(next)
    }

    requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  if (pathname !== '/') return null

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full bg-sage-200/30"
      aria-hidden
    >
      <div
        className="h-full bg-sage-mid transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
