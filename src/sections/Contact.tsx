import { ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import { profile } from '../data'

const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Mustansar! I visited your portfolio and I'm interested in discussing AI automation services.")}`

export default function Contact() {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
    { label: 'WhatsApp', value: profile.whatsappDisplay, href: wa, icon: MessageCircle, external: true },
    { label: 'LinkedIn', value: 'mustansar-munir', href: profile.linkedin, icon: Linkedin, external: true },
    ...(profile.github ? [{ label: 'GitHub', value: profile.github.replace(/^https?:\/\/(www\.)?/, ''), href: profile.github, icon: Github, external: true }] : []),
  ]

  return (
    <footer id="contact" data-theme="dark" className="scroll-mt-20 bg-night text-paper" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3 text-paper/50">Contact</p>
            <h2 id="contact-title" className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1] tracking-[-0.04em]">
              Let&rsquo;s build something <em className="font-serif font-normal italic text-gradient-light pr-1">intelligent.</em>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/60">
              Voice agents, AI receptionists or workflow automation, tell me what you need.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-paper/50"><MapPin size={14} /> {profile.location}</p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {channels.map((c, i) => (
              <li key={c.label} className={i === 0 && channels.length % 2 === 1 ? 'sm:col-span-2' : ''}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[.04] p-4 transition-colors hover:border-white/25 hover:bg-white/[.08]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-paper"><c.icon size={17} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] text-paper/50">{c.label}</span>
                    <span className="block truncate text-[14px] font-medium">{c.value}</span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-paper/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/10 pt-5 text-[12.5px] text-paper/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Mustansar Munir</p>
          <p>AI Automation Engineer · Islamabad, Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
