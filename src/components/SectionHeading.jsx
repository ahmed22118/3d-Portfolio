import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center max-w-2xl mx-auto">
      <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-3 text-muted text-sm sm:text-base">{subtitle}</p>}
    </Reveal>
  )
}
