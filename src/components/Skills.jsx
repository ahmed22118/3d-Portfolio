import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import SectionTransition from './SectionTransition.jsx'
import { skills, TIERS, connections } from '../data/skills.js'

const ENTRY_DIRECTIONS = [
  { x: -300, y: 0 },
  { x: 300, y: 0 },
  { x: 0, y: -240 },
  { x: 0, y: 240 },
  { x: 0, y: 0, scale: 0.15 }, // "deep z-axis" — scales up from nothing
]

const PHYSICS_RADIUS = 95
const PHYSICS_STRENGTH = 16

// ---------- Neural connection lines (SVG overlay, computed from live DOM rects) ----------
function NeuralLines({ boardRef, keyRefs, ready }) {
  const [paths, setPaths] = useState([])

  const recompute = useCallback(() => {
    const board = boardRef.current
    if (!board) return
    const cRect = board.getBoundingClientRect()
    const next = []
    connections.forEach(([a, b]) => {
      const elA = keyRefs.current[a]
      const elB = keyRefs.current[b]
      if (!elA || !elB) return
      const ra = elA.getBoundingClientRect()
      const rb = elB.getBoundingClientRect()
      next.push({
        id: `${a}-${b}`,
        x1: ra.left + ra.width / 2 - cRect.left,
        y1: ra.top + ra.height / 2 - cRect.top,
        x2: rb.left + rb.width / 2 - cRect.left,
        y2: rb.top + rb.height / 2 - cRect.top,
      })
    })
    setPaths(next)
  }, [boardRef, keyRefs])

  useEffect(() => {
    if (!ready) return
    const t = setTimeout(recompute, 650) // wait for entrance animation to settle
    window.addEventListener('resize', recompute)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', recompute)
    }
  }, [ready, recompute])

  if (!paths.length) return null

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((p) => (
        <g key={p.id}>
          <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="rgba(0,229,255,0.1)" strokeWidth="1" />
          <motion.line
            x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
            stroke="url(#neural-grad)"
            strokeWidth="1.4"
            strokeDasharray="5 16"
            animate={{ strokeDashoffset: [0, -210] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          />
        </g>
      ))}
    </svg>
  )
}

// ---------------------------- Individual key ----------------------------
function KeyCap({ skill, index, registerRef, registerPhysicsRef, isActive }) {
  const [hovered, setHovered] = useState(false)
  const tier = TIERS[skill.tier]
  const dir = ENTRY_DIRECTIONS[index % ENTRY_DIRECTIONS.length]
  const outerRef = useRef(null)
  const physicsRef = useRef(null)

  useEffect(() => {
    registerRef(skill.id, outerRef.current)
    registerPhysicsRef(skill.id, physicsRef.current)
  }, [skill.id, registerRef, registerPhysicsRef])

  return (
    <motion.div
      ref={outerRef}
      className="relative"
      initial={{ opacity: 0, x: dir.x, y: dir.y, scale: dir.scale ?? 0.5, rotate: index % 2 ? 10 : -10 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay: (index % 14) * 0.035, ease: [0.16, 1, 0.3, 1] }}
    >
      <div ref={physicsRef} style={{ transition: 'transform 0.4s ease-out' }}>
        <motion.button
          type="button"
          data-cursor-hover
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{
            y: hovered ? -9 : isActive ? -3 : 0,
            rotate: hovered ? (index % 2 ? 4 : -4) : 0,
            scale: hovered ? 1.1 : isActive ? 1.04 : 1,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 16 }}
          className="key-cap relative w-full font-mono text-[10px] sm:text-[11px] font-semibold px-2.5 py-2.5 rounded-lg text-ink/90 select-none whitespace-nowrap"
          style={{
            background: hovered || isActive
              ? `linear-gradient(160deg, ${tier.color}2e, #0b1422)`
              : 'rgba(11,20,34,0.85)',
            border: `1px solid ${hovered || isActive ? tier.color : 'rgba(255,255,255,0.09)'}`,
            boxShadow: hovered
              ? `0 18px 32px -8px ${tier.glow}, 0 0 0 1px ${tier.color}`
              : isActive
                ? `0 0 16px ${tier.glow}`
                : '0 2px 0 rgba(0,0,0,0.45)',
          }}
        >
          {skill.label}
        </motion.button>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-56 z-30 pointer-events-none"
          >
            <div
              className="glass-strong rounded-xl p-3.5 text-left relative"
              style={{ boxShadow: `0 0 34px ${tier.glow}`, borderColor: `${tier.color}55` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden rounded-t-xl">
                <motion.div
                  className="h-full w-1/3"
                  style={{ background: tier.color }}
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-display text-xs font-bold text-ink">{skill.label}</p>
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wide"
                  style={{ color: tier.color, border: `1px solid ${tier.color}55` }}
                >
                  {tier.label}
                </span>
              </div>
              <p className="text-[11px] text-muted leading-snug mb-2">{skill.description}</p>
              <p className="text-[9px] font-mono text-accent uppercase tracking-wider mb-1">Used In</p>
              <ul className="space-y-0.5">
                {skill.usedIn.slice(0, 3).map((u) => (
                  <li key={u} className="text-[10px] text-ink/75 flex gap-1.5">
                    <span style={{ color: tier.color }}>›</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="w-2.5 h-2.5 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-[5px]"
              style={{
                background: 'rgba(15,23,42,0.92)',
                borderRight: `1px solid ${tier.color}55`,
                borderBottom: `1px solid ${tier.color}55`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ---------------------------- Section ----------------------------
export default function Skills() {
  const boardRef = useRef(null)
  const keyRefs = useRef({})
  const physicsRefs = useRef({})
  const centersRef = useRef({})
  const rafPending = useRef(false)
  const [boardReady, setBoardReady] = useState(false)
  const [activeIds, setActiveIds] = useState([])

  const registerRef = useCallback((id, el) => {
    keyRefs.current[id] = el
  }, [])
  const registerPhysicsRef = useCallback((id, el) => {
    physicsRefs.current[id] = el
  }, [])

  // Cache key centers once layout settles (after entrance animation) and on resize —
  // avoids per-frame getBoundingClientRect calls, which were the main source of jank.
  const recomputeCenters = useCallback(() => {
    const board = boardRef.current
    if (!board) return
    const cRect = board.getBoundingClientRect()
    const next = {}
    skills.forEach((s) => {
      const el = keyRefs.current[s.id]
      if (!el) return
      const r = el.getBoundingClientRect()
      next[s.id] = {
        cx: r.left + r.width / 2 - cRect.left,
        cy: r.top + r.height / 2 - cRect.top,
      }
    })
    centersRef.current = next
  }, [])

  useEffect(() => {
    setBoardReady(true)
    const t = setTimeout(recomputeCenters, 700)
    window.addEventListener('resize', recomputeCenters)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', recomputeCenters)
    }
  }, [recomputeCenters])

  // Ambient "AI processing" effect — random keys light up on their own
  useEffect(() => {
    const interval = setInterval(() => {
      const pick = skills[Math.floor(Math.random() * skills.length)]
      setActiveIds((prev) => [...prev.slice(-1), pick.id])
      setTimeout(() => {
        setActiveIds((prev) => prev.filter((id) => id !== pick.id))
      }, 1100)
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  // Single throttled handler for the whole board — uses cached centers,
  // writes transforms directly to refs (no React re-render, no layout reads).
  const onPointerMove = (e) => {
    if (rafPending.current) return
    rafPending.current = true
    const board = boardRef.current
    requestAnimationFrame(() => {
      rafPending.current = false
      if (!board) return
      const bRect = board.getBoundingClientRect()
      const mx = e.clientX - bRect.left
      const my = e.clientY - bRect.top
      for (const id in centersRef.current) {
        const c = centersRef.current[id]
        const el = physicsRefs.current[id]
        if (!el) continue
        const dx = c.cx - mx
        const dy = c.cy - my
        const dist = Math.hypot(dx, dy)
        if (dist < PHYSICS_RADIUS && dist > 0.01) {
          const force = ((PHYSICS_RADIUS - dist) / PHYSICS_RADIUS) * PHYSICS_STRENGTH
          el.style.transform = `translate(${(dx / dist) * force}px, ${(dy / dist) * force}px)`
        } else {
          el.style.transform = 'translate(0px, 0px)'
        }
      }
    })
  }

  const onPointerLeave = () => {
    Object.values(physicsRefs.current).forEach((el) => {
      if (el) el.style.transform = 'translate(0px, 0px)'
    })
  }

  return (
    <SectionTransition id="skills" tint="violet" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="AI Operating System"
          title="Skills"
          subtitle="A living control panel — gold keys are expert-level, blue is advanced, green is intermediate. Hover any key."
        />

        <div className="flex items-center justify-center gap-6 mb-8 text-[11px] font-mono">
          {Object.values(TIERS).map((t) => (
            <span key={t.label} className="flex items-center gap-1.5 text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
              {t.label}
            </span>
          ))}
        </div>

        <div
          ref={boardRef}
          data-keyboard-board
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative rounded-3xl border border-white/10 bg-bg-soft/60 p-6 sm:p-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 10%, rgba(0,229,255,0.07), transparent 45%), radial-gradient(circle at 85% 80%, rgba(124,58,237,0.08), transparent 45%)',
          }}
        >
          <NeuralLines boardRef={boardRef} keyRefs={keyRefs} ready={boardReady} />

          <div className="relative grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2.5 sm:gap-3">
            {skills.map((skill, i) => (
              <KeyCap
                key={skill.id}
                skill={skill}
                index={i}
                registerRef={registerRef}
                registerPhysicsRef={registerPhysicsRef}
                isActive={activeIds.includes(skill.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  )
}
