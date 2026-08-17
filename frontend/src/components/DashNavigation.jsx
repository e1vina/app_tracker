import { useState, useEffect } from "react"
import Navbar from "./Navbar"

const DashNavigation = () => {
  const [initials, setInitials] = useState("")

  useEffect(() => {
    const fetchUserInitials = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const userData = await res.json()
          const userInitials =
            (userData.firstName?.[0] || "") + (userData.lastName?.[0] || "")
          setInitials(userInitials)
        }
      } catch (error) {
        console.error("Error fetching user initials:", error)
      }
    }

    fetchUserInitials()
  }, [])

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/application", label: "Applications" },
    { to: "/universities", label: "Universities" },
    {
      to: "/profile",
      label: (
        <span className="navbar-profile-label">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar-profile-icon" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>{initials || "Profile"}</span>
        </span>
      ),
      className: "dash-avatar",
    },
  ]

  return <Navbar links={navLinks} />
}

export default DashNavigation