import { motion } from 'framer-motion'

const worldVariants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

// Wraps a <section> so entering it on scroll feels like stepping into a
// new "world" — fade+blur+scale in, plus a unique ambient color wash
// behind the content so each section reads as a distinct environment.
export default function SectionTransition({ id, tint = 'cyan', className = '', children }) {
  const tints = {
    cyan: 'from-primary/10 via-transparent to-transparent',
    violet: 'from-secondary/12 via-transparent to-transparent',
    green: 'from-accent/10 via-transparent to-transparent',
    mixed: 'from-primary/8 via-secondary/8 to-transparent',
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={worldVariants}
      className={`relative ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${tints[tint]} pointer-events-none -z-[1]`} />
      {children}
    </motion.section>
  )
}
