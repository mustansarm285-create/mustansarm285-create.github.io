import type Lenis from 'lenis'

let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => { lenis = l }

/** Smooth-scroll to an in-page anchor, falling back to native scrolling. */
export function scrollToHash(hash: string, immediate = false) {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (immediate) {
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY)
    lenis?.scrollTo(target, { immediate: true, force: true })
  } else if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 })
  else target.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', hash)
}

/** Jump to the top instantly (used on page changes). */
export function scrollTopNow() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

/** Pause / resume page scrolling (used while a modal is open). */
export function lockScroll(locked: boolean) {
  if (lenis) { if (locked) lenis.stop(); else lenis.start() }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
