import { useEffect, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { scrollToHash } from '../lib/scroll'

const links = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/** Compact sticky navigation with scroll-spy. */
export default function Nav() {
  const [active, setActive] = useState('top')
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24)
      const probe = window.innerHeight * 0.35
      let current = 'top'
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top <= probe) current = l.id
      }
      // the last section may be too short to reach the probe line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact'
      setActive(current)
      const c = document.getElementById('contact')
      setDark(!!c && c.getBoundingClientRect().top <= 40)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToHash('#' + id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-2 rounded-full max-sm:justify-center py-1.5 pl-2 pr-1.5 transition-all duration-300 sm:pl-3 ${
          dark ? 'glass-dark text-paper shadow-[0_16px_40px_-20px_rgba(0,0,0,.6)]' : scrolled ? 'glass' : 'bg-white/60 backdrop-blur-md ring-1 ring-line'
        }`}
      >
        <a href="#top" onClick={(e) => go(e, 'top')} className="flex shrink-0 items-center gap-2 text-[14px] font-semibold tracking-tight max-sm:hidden" aria-label="Mustansar Munir, back to top">
          <span className={`grid h-7 w-7 place-items-center rounded-lg font-mono text-[10.5px] ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>MM</span>
          <span className="hidden md:inline">Mustansar Munir</span>
        </a>
        <ul className="flex items-center">
          {links.map((l) => {
            const on = active === l.id
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  aria-current={on ? 'true' : undefined}
                  className={`relative block rounded-full px-2 py-2 text-[12.5px] font-medium transition-colors min-[400px]:px-2.5 min-[400px]:text-[13px] sm:px-4 sm:text-[13.5px] ${
                    on ? (dark ? 'text-ink' : 'text-paper') : dark ? 'text-paper/70 hover:text-paper' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-on"
                      className={`absolute inset-0 rounded-full ${dark ? 'bg-paper' : 'bg-ink'}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
