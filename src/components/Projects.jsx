import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import SectionTransition from './SectionTransition.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)

  return (
    <SectionTransition id="projects" tint="mixed">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects"
          subtitle="Eight builds spanning generative models, computer vision, and full-stack systems."
        />

        {/* Desktop: expanding horizontal panels */}
        <Reveal>
          <div className="hidden md:flex gap-3 h-[420px]">
            {projects.map((p) => {
              const isActive = activeId === p.id
              return (
                <motion.div
                  key={p.id}
                  data-cursor-hover
                  onMouseEnter={() => setActiveId(p.id)}
                  animate={{ flex: isActive ? 5 : 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer glass-strong"
                  style={{
                    boxShadow: isActive
                      ? '0 30px 60px -20px rgba(0,229,255,0.25)'
                      : '0 10px 20px -10px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/15" />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 20%, rgba(0,229,255,0.25), transparent 50%)',
                    }}
                  />

                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-mono text-[11px] text-muted [writing-mode:vertical-rl] tracking-widest">
                        {p.category}
                      </p>
                    </div>
                  )}

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="absolute inset-0 p-7 flex flex-col justify-between"
                    >
                      <div>
                        <p className="font-mono text-[11px] text-accent uppercase tracking-widest mb-2">
                          {p.category}
                        </p>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-3 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed mb-4 max-w-md">
                          {p.description}
                        </p>

                        {p.stats && (
                          <div className="flex gap-6 mb-4">
                            {p.stats.map((s) => (
                              <div key={s.label}>
                                <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                                <p className="text-[11px] text-muted">{s.label}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tech.map((t) => (
                            <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-muted">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {p.links?.demo && (
                            <a
                              href={p.links.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-primary text-bg"
                            >
                              <ExternalLink size={14} /> Live Demo
                            </a>
                          )}
                          {p.links?.github && (
                            <a
                              href={p.links.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-white/20 text-ink"
                            >
                              <Github size={14} /> Code
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </Reveal>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[11px] text-accent uppercase tracking-widest mb-2">{p.category}</p>
                <h3 className="font-display text-lg font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">{p.description}</p>
                {p.stats && (
                  <div className="flex gap-6 mb-3">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display text-xl font-bold text-primary">{s.value}</p>
                        <p className="text-[11px] text-muted">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {p.links?.demo && (
                    <a href={p.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-primary text-bg">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {p.links?.github && (
                    <a href={p.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-white/20 text-ink">
                      <Github size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionTransition>
  )
}
