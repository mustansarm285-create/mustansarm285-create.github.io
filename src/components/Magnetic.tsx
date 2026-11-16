import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  href: string
  variant?: 'dark' | 'light' | 'ghost' | 'ghostDark'
  className?: string
  external?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

const styles = {
  dark: 'bg-ink text-paper hover:shadow-[0_18px_40px_-12px_rgba(47,75,110,.55)]',
  light: 'bg-paper text-ink hover:text-paper hover:shadow-[0_18px_40px_-12px_rgba(62,92,126,.6)]',
  ghost: 'glass text-ink',
  ghostDark: 'glass-dark text-paper hover:bg-white/10',
}

export default function Magnetic({ children, href, variant = 'dark', className = '', external, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  const move = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const leave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x, y }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-[15px] font-medium transition-[box-shadow,color] duration-300 ${styles[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {(variant === 'dark' || variant === 'light') && (
        <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-blue to-violet transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-y-0" />
      )}
    </motion.a>
  )
}
