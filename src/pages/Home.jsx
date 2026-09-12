import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import ScrollSentence from '../sections/ScrollSentence'
import About from '../sections/About'
import ArrowCue from '../sections/ArrowCue'
import Work from '../sections/Work'
import Services from '../sections/Services'
import Skills from '../sections/Skills'

export default function Home() {
  const { state } = useLocation()

  // arriving from another route with a section in mind
  useEffect(() => {
    if (!state?.scrollTo) return
    const target = document.getElementById(state.scrollTo)
    target?.scrollIntoView({ behavior: 'smooth' })
  }, [state])

  return (
    <>
      <Hero />
      <ScrollSentence />
      <About />
      <ArrowCue />
      <Work />
      <Services />
      <Skills />
    </>
  )
}
