import { useEffect } from "react"
import Top from "../components/Top"
import Image from "../assets/top.png"
import Rates from "../components/Rates"
import Info from "../components/Info"
import "./home.css"

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="home-page">
      <section className="home-hero">
        <Top />
        <div className="home-hero-image">
          <img src={Image} height={576} width={1024} alt="Study abroad application dashboard preview" />
        </div>
      </section>
      <Rates />
      <Info />
    </div>
  )
}

export default Home
