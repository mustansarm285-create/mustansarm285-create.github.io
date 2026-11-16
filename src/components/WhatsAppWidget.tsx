import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { profile } from '../data'

const DEFAULT_MESSAGE = "Hi Mustansar! I visited your portfolio and I'm interested in discussing AI automation services."

const quick = [
  "I'm interested in AI Automation.",
  'I need an AI Voice Agent.',
  'I want to automate my business.',
  "I'd like to discuss a project.",
]

/** wa.me deep link with a prefilled message; works on mobile apps and WhatsApp Web/Desktop. */
export const whatsappLink = (text: string) => `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`

function WhatsAppGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89zm8.42-18.31A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.41z" />
    </svg>
  )
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  // close on Escape and return focus to the button
  useEffect(() => {
    if (!open) return
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); trigger.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const message = picked ? `Hi Mustansar! I visited your portfolio. ${picked}` : DEFAULT_MESSAGE

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="wa-panel"
            role="dialog"
            aria-label="Chat with Mustansar on WhatsApp"
            tabIndex={-1}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(calc(100vw-2rem),360px)] origin-bottom-right overflow-hidden rounded-[22px] border border-line bg-[#fafaf8]/95 shadow-[0_30px_70px_-30px_rgba(23,36,58,.35),0_8px_20px_-12px_rgba(23,36,58,.15)] outline-none backdrop-blur-xl"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-line bg-white/80 px-4 py-3.5">
              <img src="/portrait.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold leading-tight text-ink">Mustansar Munir</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-mute">
                  <span className="text-[#25d366]"><WhatsAppGlyph size={12} /></span> Continues in WhatsApp
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setOpen(false); trigger.current?.focus() }}
                className="grid h-8 w-8 place-items-center rounded-full text-mute transition-colors hover:bg-ink/5 hover:text-ink"
                aria-label="Close chat panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* body */}
            <div className="space-y-4 bg-[linear-gradient(180deg,#f2f3f4,#eef4f9)] px-4 py-4">
              <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13.5px] leading-snug text-ink-2 shadow-[0_1px_2px_rgba(23,36,58,.06)]">
                Hello! Welcome to Mustansar's portfolio. How can I help you?
              </div>

              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[.12em] text-mute">Choose a topic</p>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Suggested messages">
                  {quick.map((q) => {
                    const on = picked === q
                    return (
                      <button
                        key={q}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPicked(on ? null : q)}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-[12.5px] transition-colors ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white text-ink-2 hover:border-steel hover:text-ink'}`}
                      >
                        {on && <Check size={12} />} {q}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-steel/50 bg-white/60 px-3 py-2">
                <p className="text-[10.5px] font-medium uppercase tracking-[.12em] text-mute">Message preview</p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-2">{message}</p>
              </div>
            </div>

            {/* action */}
            <div className="border-t border-line bg-white/80 p-3">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper transition-[background-color,box-shadow] hover:bg-[#1f3150] hover:shadow-[0_12px_28px_-12px_rgba(23,36,58,.5)]"
              >
                <span className="text-[#25d366]"><WhatsAppGlyph size={17} /></span>
                Continue on WhatsApp
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-2 text-center text-[10.5px] text-mute">Opens WhatsApp with your message ready to send.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="wa-panel"
        aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-white text-[#25d366] shadow-[0_14px_34px_-14px_rgba(23,36,58,.45),0_2px_6px_rgba(23,36,58,.08)] transition-shadow hover:shadow-[0_18px_40px_-14px_rgba(23,36,58,.5)]"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-line" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'wa'}
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className={open ? 'text-ink' : ''}
          >
            {open ? <X size={22} /> : <WhatsAppGlyph size={26} />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-paper opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block">
            Chat on WhatsApp
          </span>
        )}
      </motion.button>
    </div>
  )
}
