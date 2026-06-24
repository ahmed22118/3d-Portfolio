import { useEffect, useRef } from 'react'

// Lightweight neural-network-style floating particle field rendered on canvas.
// Respects prefers-reduced-motion by rendering a static frame only.
export default function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width, height, particles, raf

    const COLORS = ['#00E5FF', '#7C3AED', '#22C55E']

    const init = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const count = Math.min(70, Math.floor((width * height) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const path = new Path2D()
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const distSq = dx * dx + dy * dy
          if (distSq < 16900) {
            // squared-distance check avoids a sqrt for the common "too far" case
            path.moveTo(p.x, p.y)
            path.lineTo(q.x, q.y)
          }
        }
      }
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)'
      ctx.lineWidth = 1
      ctx.stroke(path)
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.7
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    init()
    draw()
    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  )
}
