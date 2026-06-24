import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let mouseX = ringX
    let mouseY = ringY

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const onOver = (e) => {
      if (e.target.closest('[data-cursor-hover]')) {
        document.body.classList.add('cursor-hover')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('[data-cursor-hover]')) {
        document.body.classList.remove('cursor-hover')
      }
    }

    let raf
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  )
}
