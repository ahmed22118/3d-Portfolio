import Reveal from './Reveal.jsx'
import SectionTransition from './SectionTransition.jsx'
import SectionHeading from './SectionHeading.jsx'
import { profile } from '../data/profile.js'

const FOCUS_AREAS = [
  'Generative AI',
  'Computer Vision',
  'Deep Learning',
  'NLP',
  'Vision Language Models',
  'Full Stack Development',
]

export default function About() {
  return (
    <SectionTransition id="about" tint="cyan">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Profile"
          title="About"
          subtitle="The intersection of research-grade AI and production-grade engineering."
        />

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <p className="text-ink/90 leading-relaxed text-sm sm:text-base mb-6 relative z-10">
              {profile.summary}
            </p>
            <div className="flex flex-wrap gap-2 relative z-10">
              {FOCUS_AREAS.map((area) => (
                <span
                  key={area}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionTransition>
  )
}
