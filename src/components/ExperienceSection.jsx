import { GraduationCap, Briefcase } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import SectionTransition from './SectionTransition.jsx'
import { experience, education } from '../data/profile.js'

export default function ExperienceSection() {
  const items = [
    ...experience.map((e) => ({ type: 'work', ...e })),
    ...education.map((e) => ({ type: 'edu', org: e.school, role: e.degree, period: e.period, points: [] })),
  ]

  return (
    <SectionTransition id="experience" tint="green">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Journey" title="Experience & Education" />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1} className="relative mb-10 last:mb-0">
              <span className="absolute -left-8 sm:-left-10 top-1 w-4 h-4 rounded-full bg-bg border-2 border-primary shadow-glow-cyan flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1 text-accent">
                  {item.type === 'work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                  <span className="font-mono text-[11px] tracking-widest uppercase">{item.period}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{item.role}</h3>
                <p className="text-sm text-primary/90 mb-3">{item.org}</p>
                {item.points.length > 0 && (
                  <ul className="space-y-1.5">
                    {item.points.map((pt, j) => (
                      <li key={j} className="text-sm text-muted flex gap-2">
                        <span className="text-accent mt-1">▹</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionTransition>
  )
}
