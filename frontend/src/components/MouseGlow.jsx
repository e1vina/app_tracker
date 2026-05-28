import { useEffect, useRef } from "react"
import "./mouseGlow.css"

const LERP = 0.1

const MouseGlow = () => {
  const glowRef = useRef(null)
  const position = useRef({ x: -500, y: -500 })
  const target = useRef({ x: -500, y: -500 })
  const visible = useRef(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(pointer: fine)")

    if (reducedMotion.matches || !finePointer.matches) {
      return undefined
    }

    const el = glowRef.current
    if (!el) {
      return undefined
    }

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }
      if (!visible.current) {
        visible.current = true
        el.classList.add("mouse-glow--active")
      }
    }

    const onLeave = () => {
      visible.current = false
      el.classList.remove("mouse-glow--active")
    }

    let frameId = 0

    const tick = () => {
      position.current.x += (target.current.x - position.current.x) * LERP
      position.current.y += (target.current.y - position.current.y) * LERP
      el.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return <div ref={glowRef} className="mouse-glow" aria-hidden="true" />
}

export default MouseGlow
