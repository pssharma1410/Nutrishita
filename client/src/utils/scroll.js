/**
 * Smooth-scroll to element id (accounts for sticky navbar offset).
 */
export function scrollToSection(id, offsetPx = 80) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offsetPx
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
