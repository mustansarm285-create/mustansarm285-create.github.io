import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import { featured, moreWork, type Project } from '../data'
import ProjectModal, { photoUrl } from '../components/ProjectModal'

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
})

function Photo({ p, sizes, className = '' }: { p: Project; sizes: string; className?: string }) {
  return (
    <img
      src={photoUrl(p.photo.id, 1200)}
      srcSet={`${photoUrl(p.photo.id, 640)} 640w, ${photoUrl(p.photo.id, 960)} 960w, ${photoUrl(p.photo.id, 1400)} 1400w`}
      sizes={sizes}
      alt={p.photo.alt}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${className}`}
    />
  )
}

function DetailsButton({ onOpen, label = 'View details' }: { onOpen: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-paper transition-shadow hover:shadow-[0_14px_30px_-12px_rgba(23,36,58,.5)]"
    >
      {label} <ArrowUpRight size={15} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    </button>
  )
}

/** Large alternating showcase for a featured project. */
function Showcase({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const flip = i % 2 === 1
  return (
    <motion.article {...rise()} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby={`${p.id}-t`}>
      <div className={`relative aspect-[16/11] overflow-hidden rounded-[26px] bg-paper-2 shadow-[0_40px_90px_-50px_rgba(23,36,58,.5)] lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <Photo p={p} sizes="(min-width: 1024px) 58vw, 100vw" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] text-ink-2 backdrop-blur">Featured · 0{i + 1}</span>
        {p.status && <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur">{p.status}</span>}
        <span className="absolute bottom-3 right-4 text-[10.5px] text-white/80">Illustrative photo · {p.photo.credit} / Unsplash</span>
      </div>

      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p className="eyebrow text-mute">{p.tag}</p>
        <h3 id={`${p.id}-t`} className="mt-3 text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{p.title}</h3>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">{p.summary ?? p.short}</p>

        {p.pending ? (
          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-steel/60 bg-sky/30 p-4 text-[14px] text-ink-2">
            <Clock size={16} className="mt-0.5 shrink-0 text-blue" />
            Detailed write-up (problem, my contribution and technology) coming soon.
          </p>
        ) : (
          <>
            {p.problem && (
              <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-line">
                <p className="eyebrow text-mute">Problem</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{p.problem}</p>
              </div>
            )}
            {p.contribution && (
              <ul className="mt-5 space-y-2.5">
                {p.contribution.slice(0, 3).map((c) => (
                  <li key={c} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />{c}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {p.stack && (
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.stack.map((s) => <li key={s} className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[11.5px] text-ink-2">{s}</li>)}
          </ul>
        )}
        <div className="mt-7"><DetailsButton onOpen={onOpen} label="View full details" /></div>
      </div>
    </motion.article>
  )
}

/** Medium card for further projects. */
function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  return (
    <motion.article
      {...rise(i)}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_24px_60px_-42px_rgba(23,36,58,.4)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-36px_rgba(23,36,58,.45)] sm:flex-row"
      aria-labelledby={`${p.id}-t`}
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-paper-2 sm:aspect-auto sm:w-[42%]">
        <Photo p={p} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="eyebrow text-mute">{p.tag}</p>
        <h3 id={`${p.id}-t`} className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.02em]">{p.title}</h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-2">{p.summary ?? p.short}</p>
        {p.stack && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.stack.slice(0, 4).map((s) => <li key={s} className="rounded-full bg-[#f2f3f4] px-2.5 py-0.5 font-mono text-[11px] text-ink-2">{s}</li>)}
          </ul>
        )}
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-semibold text-blue transition-colors hover:text-ink"
        >
          View details <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="projects" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-20 md:px-10 md:py-28" aria-labelledby="projects-title">
      <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-3 text-mute">Projects</p>
          <h2 id="projects-title" className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Selected <em className="font-serif font-normal italic text-gradient pr-1">work.</em>
          </h2>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
          AI receptionists, law-firm automation, multi-agent retrieval and robotics. Open any project for the full details.
        </p>
      </div>

      <div className="space-y-20 md:space-y-28">
        {featured.map((p, i) => <Showcase key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />)}
      </div>

      <div className="mt-24 md:mt-32">
        <p className="eyebrow mb-6 text-mute">More projects</p>
        <div className="grid gap-5 lg:grid-cols-2">
          {moreWork.map((p, i) => <Card key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />)}
        </div>
      </div>

      <AnimatePresence>{open && <ProjectModal key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  )
}
