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
          <span className="navbar-profile-icon" aria-hidden="true">👤</span>
          <span>{initials || "Profile"}</span>
        </span>
      ),
      className: "dash-avatar",
    },
  ]

  return <Navbar links={navLinks} />
}

export default DashNavigation