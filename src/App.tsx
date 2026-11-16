import { useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import { scrollToHash, setLenis } from './lib/scroll'
import Nav from './components/Nav'
import Home from './pages/Home'
import Contact from './sections/Contact'
import WhatsAppWidget from './components/WhatsAppWidget'

export default function App() {
  const reduced = !!useReducedMotion()

  // smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  // single page: send any old sub-page URL (e.g. a former case-study link) to home, honour #hash
  useEffect(() => {
    if (location.pathname !== '/') history.replaceState(null, '', '/' + location.hash)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    if (location.hash) setTimeout(() => scrollToHash(location.hash, true), 60)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main" className="page-in">
        <Home reduced={reduced} />
      </main>
      <Contact />
      <WhatsAppWidget />
    </MotionConfig>
  )
}
