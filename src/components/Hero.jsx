import { Suspense, lazy, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Download, Mail, ChevronDown } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'

const RobotScene = lazy(() => import('./RobotScene.jsx'))
import useTypewriter from '../hooks/useTypewriter.js'
import { profile } from '../data/profile.js'

export default function Hero() {
  const typed = useTypewriter(profile.taglineRoles)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      style={{ opacity, scale, filter }}
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 -right-32 w-96 h-96 bg-secondary/25 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl w-full mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="font-mono text-xs sm:text-sm text-accent mb-4 tracking-wide">
            {profile.affiliation}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] mb-4">
            <span className="text-ink">Muhammad</span>{' '}
            <span className="text-gradient">Ahmed</span>
          </h1>
          <p className="text-muted text-sm sm:text-base mb-3">{profile.subtitle}</p>

          <div className="h-8 font-mono text-lg sm:text-xl text-primary mb-8">
            {typed}
            <span className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle animate-pulse-glow" />
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticButton as="a" href={profile.resumeUrl} download variant="primary">
              <Download size={16} /> Download Resume
            </MagneticButton>
            <MagneticButton as="a" href={profile.github} target="_blank" rel="noreferrer" variant="outline">
              <Github size={16} /> GitHub
            </MagneticButton>
            <MagneticButton as="a" href={profile.linkedin} target="_blank" rel="noreferrer" variant="outline">
              <Linkedin size={16} /> LinkedIn
            </MagneticButton>
            <MagneticButton as="a" href="#contact" variant="ghost">
              <Mail size={16} /> Contact Me
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[360px] sm:h-[480px]"
        >
          <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-muted text-sm font-mono">Loading 3D scene...</div>}>
            <RobotScene className="absolute inset-0" />
          </Suspense>
        </motion.div>
      </div>

      <motion.button
        data-cursor-hover
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-label="Scroll to About section"
      >
        <ChevronDown size={24} />
      </motion.button>
    </motion.section>
  )
}
