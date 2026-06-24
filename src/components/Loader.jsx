import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STAGES = [
  'Initializing AI Systems...',
  'Loading Neural Networks...',
  'Launching Portfolio...',
]

export default function Loader({ onDone }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1))
    }, 750)

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 9 + 4
        return next >= 100 ? 100 : next
      })
    }, 90)

    return () => {
      clearInterval(stageTimer)
      clearInterval(progressTimer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setExiting(true), 350)
      const t2 = setTimeout(() => onDone(), 950)
      return () => {
        clearTimeout(t)
        clearTimeout(t2)
      }
    }
  }, [progress, onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[200] bg-bg flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid" />
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10 text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-gradient mb-6"
            >
              Muhammad Ahmed
            </motion.h1>

            <div className="h-6 font-mono text-sm sm:text-base text-primary/90">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {STAGES[stageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-8 w-64 sm:w-80 mx-auto">
              <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <p className="mt-2 font-mono text-xs text-muted">{Math.floor(progress)}%</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
