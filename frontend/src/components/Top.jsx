import { useEffect, useRef } from "react"
import gsap from "gsap"
import "./top.css"

const Top = () => {
  const compRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".Track, .all", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
      gsap.from(".subtext", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      })
      gsap.from(".hero_tag", {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        delay: 0.45,
        ease: "back.out(1.7)",
      })
    }, compRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="Top" ref={compRef}>
      <p className="Track">Track every study abroad application,</p>
      <p className="all">all in one place.</p>

      <div className="subtext">
        <p className="Manage">
          Manage deadlines, documents, and university requirements across all
          your exchange and study abroad applications — so nothing slips through
          the cracks.
        </p>
      </div>

      <div className="hero_tag">
        <p>Built for international students</p>
      </div>
    </div>
  )
}
export default Top
