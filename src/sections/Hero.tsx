import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Linkedin, MapPin } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import { scrollToHash } from '../lib/scroll'
import { profile } from '../data'

const HeroScene = lazy(() => import('../three/HeroScene'))

const ease = [0.16, 1, 0.3, 1] as const

function canUseWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Layering (back → front):
 *   backdrop (-z-10) → portrait card (z-10) → 3D canvas (z-20, metal behind the card is
 *   depth-masked by an invisible plane matching the card) → copy & buttons (z-30).
 * The portrait is the original photograph at its native 1:1 ratio, never cropped or scaled.
 */
export default function Hero({ reduced }: { reduced: boolean }) {
  const [webgl, setWebgl] = useState(false)
  useEffect(() => setWebgl(canUseWebGL()), [])
  const card = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const copyY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -90])
  const photoY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -40])

  const go = (e: MouseEvent<HTMLAnchorElement>, h: string) => { e.preventDefault(); scrollToHash(h) }

  const line = (delay: number) => ({
    initial: reduced ? false : { y: '105%' },
    animate: { y: 0 },
    transition: { duration: 0.9, delay, ease },
  })
  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  })

  return (
    <section id="top" className="relative isolate overflow-hidden" aria-label="Introduction">
      {/* warm white → pearl, with a faint soft-blue glow and cool top light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fafaf8_0%,#f2f3f4_100%)]" />
        <div className="absolute -right-[12%] top-[8%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(220,234,245,.85),rgba(220,234,245,0)_62%)]" />
        <div className="absolute -left-[20%] -top-[30%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.9),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#e4e7eb]/60 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1400px] items-center gap-y-8 px-5 pb-12 pt-24 md:px-10 lg:grid-cols-12 lg:gap-x-8 lg:pb-14 lg:pt-24">
        {/* ---------- portrait ---------- */}
        <motion.div style={{ y: photoY }} className="relative z-10 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
          <motion.div
            ref={card}
            initial={reduced ? false : { opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="relative aspect-square w-[min(66vw,260px)] overflow-hidden rounded-[28px] bg-[#3f4249] shadow-[0_30px_70px_-34px_rgba(23,36,58,.32),0_8px_20px_-12px_rgba(23,36,58,.16)] md:w-[400px] lg:mr-[6%] lg:w-[clamp(340px,34vw,500px)]"
          >
            <img
              src="/portrait.png"
              alt="Mustansar Munir, AI Automation Engineer"
              width={400}
              height={400}
              className="h-full w-full object-contain"
              {...{ fetchpriority: 'high' }}
            />
            {/* hairline highlight only; no tint over the photograph */}
            <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/25" />
          </motion.div>
        </motion.div>

        {/* ---------- copy ---------- */}
        <motion.div style={{ y: copyY }} className="@container relative z-30 lg:order-1 lg:col-span-6">
          <motion.div {...fade(0)} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2 shadow-[0_1px_2px_rgba(23,36,58,.05)] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </span>
            <span className="flex items-center gap-1.5 text-[12.5px] text-mute"><MapPin size={13} /> Islamabad, Pakistan</span>
          </motion.div>

          <h1 className="text-ink">
            <span className="split-line text-[clamp(2rem,15.4cqw,6.8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.025em]">
              <motion.span {...line(0.05)}>Mustansar</motion.span>
            </span>
            <span className="split-line text-[clamp(2rem,15.4cqw,6.8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.025em]">
              <motion.span {...line(0.12)}>Munir</motion.span>
            </span>
            <span className="sr-only"> — </span>
            <span className="split-line mt-4 md:mt-6">
              <motion.span {...line(0.24)} className="flex items-center gap-3 text-[clamp(1rem,1.7vw,1.5rem)] font-semibold uppercase tracking-[0.16em] text-blue">
                <span className="h-px w-10 bg-steel" aria-hidden="true" />
                AI Automation Engineer
              </motion.span>
            </span>
          </h1>

          <motion.p {...fade(0.35)} className="mt-6 max-w-[31rem] text-[clamp(1.02rem,1.25vw,1.18rem)] leading-relaxed text-ink-2 md:mt-7">
            Building intelligent AI agents, voice experiences and business automation systems.
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic href="#projects" onClick={(e) => go(e, '#projects')}>
              Explore Projects <ArrowDownRight size={17} className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </Magnetic>
            <Magnetic href="#contact" variant="ghost" onClick={(e) => go(e, '#contact')}>
              Contact <ArrowUpRight size={17} />
            </Magnetic>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mustansar Munir on LinkedIn"
              className="grid h-[50px] w-[50px] place-items-center rounded-full border border-line bg-white/80 text-ink-2 transition-colors hover:border-steel hover:text-ink"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* brushed-aluminium composition built around the portrait card */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene reduced={reduced} anchor={card} />
          </Suspense>
        )}
      </div>
    </section>
  )
}
