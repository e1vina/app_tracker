import { useEffect, useRef } from "react"
import gsap from "gsap"
import Top from "../components/Top"
import Image from "../assets/top.png"
import Rates from "../components/Rates"
import Info from "../components/Info"
import HomeProgramCard from "../components/HomeProgramCard"
import Footer from "../components/Footer"
import "./home.css"

const Home = () => {
  const heroImgRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    const ctx = gsap.context(() => {
      // Scale-in & fade-in entrance
      gsap.from(heroImgRef.current, {
        scale: 0.92,
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      // Gentle subtle floating effect
      gsap.to(heroImgRef.current, {
        y: "-=6",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="home-page">
      <section className="home-hero">
        <Top />
        <div className="home-hero-image" ref={heroImgRef}>
          <img src={Image} height={576} width={1024} alt="Study abroad application dashboard preview" />
        </div>
      </section>
      <Rates />
      <Info />
      <HomeProgramCard />
      <Footer />
    </div>
  )
}

export default Home
