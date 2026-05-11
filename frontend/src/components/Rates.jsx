import './rates.css'
import { useState, useEffect, useRef } from "react"

const rates = [
  { target: 2400, suffix: "+", label: "Students onboard" },
  { target: 48,   suffix: "",  label: "Partner universities" },
  { target: 6100, suffix: "+", label: "Applications tracked" },
  { target: 94,   suffix: "%", label: "Deadline success rate" },
]

const useCountUp = (target, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnView) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!started) return
    let startTime = null
    let animFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // easeOutExpo — fast start, slow landing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      if (progress < 0.75) {
        // shuffle phase: random number near target
        const randomOffset = Math.floor(Math.random() * target * 0.4)
        setCount(Math.floor(target * eased) + randomOffset > target
          ? Math.floor(target * eased)
          : Math.floor(target * eased) + randomOffset)
      } else {
        // landing phase: smooth count up to exact target
        setCount(Math.floor(eased * target))
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [started, target, duration])

  return { count, ref }
}

const RateItem = ({ target, suffix, label }) => {
  const { count, ref } = useCountUp(target, 2200)

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

const Rates = () => {
  return (
    <div className="stats-section">
      {rates.map((r, i) => (
        <RateItem key={i} target={r.target} suffix={r.suffix} label={r.label} />
      ))}
    </div>
  )
}

export default Rates