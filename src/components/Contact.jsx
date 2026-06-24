import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Copy, Check } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import SectionTransition from './SectionTransition.jsx'
import Reveal from './Reveal.jsx'
import { profile } from '../data/profile.js'

function ContactCard({ icon: Icon, label, value, href, color }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = href
    }
  }

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
      <a
        data-cursor-hover
        href={href}
        onClick={onCopy}
        className="group relative flex items-center gap-4 glass-strong rounded-2xl p-5 sm:p-6 overflow-hidden"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06)` }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 20% 20%, ${color}22, transparent 60%)` }}
        />
        <div
          className="relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}1a`, border: `1px solid ${color}40` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div className="relative text-left flex-1 min-w-0">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted mb-0.5">{label}</p>
          <p className="text-sm sm:text-base font-semibold text-ink truncate">{value}</p>
        </div>
        <div className="relative shrink-0 text-muted group-hover:text-ink transition-colors">
          {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
        </div>
      </a>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <SectionTransition id="contact" tint="cyan" className="py-24 px-6">
      <div className="max-w-xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something intelligent"
          subtitle="Open to AI/ML roles, full-stack opportunities, and collaborations. Reach out directly — no forms, no middlemen."
        />

        <Reveal>
          <div className="space-y-4">
            <ContactCard
              icon={Mail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              color="#00E5FF"
            />
            <ContactCard
              icon={Phone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              color="#22C55E"
            />
          </div>

          <p className="text-center text-[11px] text-muted mt-3 font-mono">Tap a card to copy — or click to email / call directly.</p>

          <div className="flex items-center justify-center gap-6 mt-8">
            <a data-cursor-hover href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-primary transition-colors">
              <Github size={22} />
            </a>
            <a data-cursor-hover href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-primary transition-colors">
              <Linkedin size={22} />
            </a>
          </div>
        </Reveal>
      </div>
    </SectionTransition>
  )
}
