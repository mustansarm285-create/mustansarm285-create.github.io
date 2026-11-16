import { useEffect } from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Projects from '../sections/Projects'
import ExperienceExpertise from '../sections/ExperienceExpertise'

export default function Home({ reduced }: { reduced: boolean }) {
  useEffect(() => {
    document.title = 'Mustansar Munir — AI Automation Engineer'
  }, [])
  return (
    <>
      <Hero reduced={reduced} />
      <About />
      <Projects />
      <ExperienceExpertise />
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  )
}
