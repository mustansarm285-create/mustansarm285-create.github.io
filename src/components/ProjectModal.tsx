import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, X } from 'lucide-react'
import type { Project } from '../data'
import { lockScroll } from '../lib/scroll'

export const photoUrl = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78`

/** Detail view for a project. Everything that used to live on the home page cards lives here. */
export default function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    lockScroll(true)
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
      opener?.focus()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <motion.div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        tabIndex={-1}
        data-lenis-prevent
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-paper shadow-[0_40px_100px_-30px_rgba(23,36,58,.5)] outline-none sm:rounded-[28px]"
      >
        <div className="relative h-48 overflow-hidden sm:h-60">
          <img src={photoUrl(p.photo.id, 1400)} alt={p.photo.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
          <a
            href={`https://unsplash.com/@${p.photo.profile}?utm_source=mustansar_portfolio&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-4 text-[10.5px] text-white/80 underline decoration-white/40 underline-offset-2"
          >
            Illustrative photo · {p.photo.credit} / Unsplash
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow text-mute">{p.tag}</p>
            {p.status && <span className="rounded-full bg-sky/60 px-2.5 py-0.5 text-[11px] font-medium text-blue ring-1 ring-steel/40">{p.status}</span>}
          </div>
          <h3 id="pm-title" className="mt-2 text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em]">{p.title}</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{p.summary ?? p.short}</p>

          {p.pending ? (
            <p className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-steel/60 bg-sky/30 p-4 text-[14px] text-ink-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-blue" />
              The full write-up for this project (problem, my contribution and technology) is being prepared.
            </p>
          ) : (
            <div className="mt-7 grid gap-6 md:grid-cols-5">
              {p.problem && (
                <div className="md:col-span-2">
                  <p className="eyebrow text-mute">Problem</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{p.problem}</p>
                </div>
              )}
              {p.contribution && (
                <div className="md:col-span-3">
                  <p className="eyebrow text-mute">My contribution</p>
                  <ul className="mt-2 space-y-2">
                    {p.contribution.map((c) => (
                      <li key={c} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {p.highlights && (
            <div className="mt-7">
              <p className="eyebrow text-mute">Key modules</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-sky/40 px-3 py-1 text-[12.5px] text-ink-2">{h}</li>
                ))}
              </ul>
            </div>
          )}

          {p.status && (
            <p className="mt-6 text-[12.5px] leading-relaxed text-mute">
              Portfolio concept with a front-end prototype using synthetic demo data. AI never makes final legal decisions; attorneys approve advice, engagement and sensitive messages.
            </p>
          )}

          {p.stack && (
            <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[11.5px] text-ink-2">{s}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  )
}
