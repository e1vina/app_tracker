import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [initials, setInitials] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setIsLoggedIn(false)
        return
      }

      try {
        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const userData = await res.json()
          const userInitials =
            (userData.firstName?.[0] || "") + (userData.lastName?.[0] || "")
          setInitials(userInitials.toUpperCase())
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (err) {
        setIsLoggedIn(false)
      }
    }

    fetchUser()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const baseLinks = [
    { to: "/", label: "Home", onClick: scrollToTop },
    {
      href: "#info",
      label: "About",
      onClick: (e) => {
        e.preventDefault()
        document.getElementById("info")?.scrollIntoView({ behavior: "smooth" })
      },
    },
    { to: "/faq", label: "FAQ" },
  ]

  const authLinks = isLoggedIn
    ? [
        { to: "/dashboard", label: "Dashboard" },
        {
          to: "/profile",
          label: initials || "Profile",
          className: "dash-avatar",
        },
      ]
    : [
        { to: "/login", label: "Log in", className: "log" },
        { to: "/signup", label: "Sign up", className: "sign" },
      ]

  const navLinks = [...baseLinks, ...authLinks]

  return <Navbar links={navLinks} />
}

export default Navigation