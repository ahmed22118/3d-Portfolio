import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-5 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass-strong py-2.5 px-6' : ''
        }`}
      >
        <button
          data-cursor-hover
          onClick={() => scrollTo('hero')}
          className="font-display font-bold text-lg tracking-tight text-ink"
        >
          M<span className="text-primary">A</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-cursor-hover
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          data-cursor-hover
          onClick={() => scrollTo('contact')}
          className="hidden md:inline-flex text-sm font-semibold px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
        >
          Let's Talk
        </button>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-4 glass-strong rounded-2xl p-4 flex flex-col gap-3"
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left text-sm font-medium text-muted hover:text-primary py-1"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
