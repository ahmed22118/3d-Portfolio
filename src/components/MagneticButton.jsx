import { useRef } from 'react'

const VARIANTS = {
  primary: 'bg-gradient-to-r from-primary to-secondary text-bg shadow-glow-cyan',
  outline: 'border border-primary/40 text-primary hover:bg-primary/10',
  ghost: 'border border-white/15 text-ink hover:border-secondary/50',
}

export default function MagneticButton({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const onClick = (e) => {
    const el = ref.current
    if (!el) return
    const ripple = document.createElement('span')
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.6
    ripple.style.position = 'absolute'
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.borderRadius = '50%'
    ripple.style.background = 'rgba(255,255,255,0.25)'
    ripple.style.pointerEvents = 'none'
    ripple.style.transform = 'scale(0)'
    ripple.style.opacity = '1'
    ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease'
    el.appendChild(ripple)
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)'
      ripple.style.opacity = '0'
    })
    setTimeout(() => ripple.remove(), 650)
    props.onClick?.(e)
  }

  return (
    <Tag
      ref={ref}
      data-cursor-hover
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
      onClick={onClick}
      className={`btn-magnetic relative overflow-hidden px-6 py-3 rounded-full font-semibold text-sm transition-transform duration-200 ease-out ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Tag>
  )
}
