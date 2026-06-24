import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import SectionTransition from './SectionTransition.jsx'
import { achievements } from '../data/profile.js'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const startTime = performance.now()

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplay(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(step)
      else setDisplay(value)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-bold text-gradient">
      {display}
      {suffix}
    </span>
  )
}

export default function Achievements() {
  return (
    <SectionTransition tint="green">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Track Record" title="Achievements" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <Counter value={a.value} suffix={a.suffix} />
              <p className="mt-2 text-xs sm:text-sm text-muted">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  )
}
