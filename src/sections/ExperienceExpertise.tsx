import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { education, experience, skills } from '../data'

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as const },
})

export default function ExperienceExpertise() {
  return (
    <section id="experience" className="scroll-mt-20 px-3 md:px-4" aria-labelledby="xp-title">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-line bg-[linear-gradient(180deg,#f2f3f4_0%,#eaf2f9_100%)] px-5 py-16 md:px-10 md:py-24">
        <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3 text-mute">Experience & skills</p>
            <h2 id="xp-title" className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1] tracking-[-0.04em]">
              Where I&rsquo;ve <em className="font-serif font-normal italic text-gradient pr-1">built.</em>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
            Voice AI, automation and machine-learning roles, from research internships to production systems.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* timeline */}
          <ol className="relative lg:col-span-7">
            <span className="absolute bottom-4 left-[7px] top-4 w-px bg-ink/15" aria-hidden="true" />
            {experience.map((x, i) => (
              <motion.li key={x.company} {...rise(i)} className="relative pb-10 pl-9 last:pb-0">
                <span className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-[#f2f3f4] ${i < 2 ? 'bg-blue shadow-[0_0_0_5px_rgba(70,105,138,.15)]' : 'bg-steel'}`} aria-hidden="true" />
                <div className="rounded-[22px] bg-white/85 p-5 ring-1 ring-line md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em]">
                      {x.company}
                      {x.note === 'Part-time' && <span className="ml-2 rounded-full bg-sky/60 px-2 py-0.5 align-middle text-[10.5px] font-medium text-blue ring-1 ring-steel/40">Part-time</span>}
                    </h3>
                    <span className="font-mono text-[11.5px] text-mute">{x.period}{x.note && x.note !== 'Part-time' ? ` · ${x.note}` : ''}</span>
                  </div>
                  <p className="mt-0.5 font-serif text-[1.15rem] italic text-ink-2">{x.role}</p>
                  <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-ink">{x.line}</p>
                  <ul className="mt-3 space-y-2">
                    {x.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-[14px] leading-snug text-ink-2">
                        <span className="mt-[0.6em] h-px w-3 shrink-0 bg-ink/30" aria-hidden="true" />{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* skills, education, certification */}
          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[22px] bg-white/85 p-5 ring-1 ring-line md:p-6">
                <p className="eyebrow mb-4 text-mute">Technical skills</p>
                <div className="space-y-4">
                  {skills.map((s) => (
                    <div key={s.group}>
                      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[.1em] text-ink-2">{s.group}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {s.items.map((it) => (
                          <li key={it} className="rounded-full bg-[#f2f3f4] px-3 py-1 text-[12.5px] text-ink-2">{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="flex gap-3 rounded-2xl bg-white/85 p-4 ring-1 ring-line">
                  <GraduationCap size={18} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />
                  <div>
                    <p className="text-[14px] font-semibold">{education.degree}</p>
                    <p className="text-[12.5px] text-mute">{education.school} · {education.period}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-white/85 p-4 ring-1 ring-line">
                  <Award size={18} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />
                  <p className="text-[14px] font-semibold leading-snug">{education.cert}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
