import { motion } from 'framer-motion'
import { Bot, Cloud, Database, PhoneCall, ScanEye, Workflow } from 'lucide-react'
import { about, services } from '../data'

const icons = [PhoneCall, Bot, Database, Workflow, Cloud, ScanEye]

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const },
})

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-20 md:px-10 md:py-28" aria-labelledby="about-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3 text-mute">About</p>
          <h2 id="about-title" className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            AI systems that do <em className="font-serif font-normal italic text-gradient pr-1">real work.</em>
          </h2>
        </div>
        <div className="lg:col-span-7">
          <motion.p {...rise()} className="text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-ink-2">
            {about.intro}
          </motion.p>
          <motion.p {...rise(1)} className="mt-4 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-relaxed text-ink">
            {about.now}
          </motion.p>
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-4">
        {about.stats.map((s, i) => (
          <motion.div key={s.label} {...rise(i)} className="bg-white p-5 md:p-6">
            <dt className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight text-ink">{s.value}</dt>
            <dd className="mt-1 text-[13.5px] leading-snug text-mute">{s.label}</dd>
          </motion.div>
        ))}
      </dl>

      <div className="mt-16 md:mt-20">
        <p className="eyebrow mb-6 text-mute">What I do</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.li
                key={s.title}
                {...rise(i)}
                className="group rounded-[22px] border border-line bg-white p-6 shadow-[0_20px_50px_-40px_rgba(23,36,58,.4)] transition-shadow duration-500 hover:shadow-[0_26px_60px_-34px_rgba(23,36,58,.42)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#eef4f9] to-[#e4edf5] text-blue ring-1 ring-steel/25 transition-transform duration-500 group-hover:scale-105">
                  <Icon size={19} />
                </span>
                <h3 className="mt-5 text-[17.5px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.body}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
