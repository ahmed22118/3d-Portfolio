import { useState, useCallback } from 'react'
import Loader from './components/Loader.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ParticlesBackground from './components/ParticlesBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Achievements from './components/Achievements.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const onDone = useCallback(() => setLoading(false), [])

  return (
    <>
      {loading && <Loader onDone={onDone} />}
      <CustomCursor />
      <ParticlesBackground />
      <div className="noise" />
      {!loading && (
        <div className="relative">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <ExperienceSection />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
