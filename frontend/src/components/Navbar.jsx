import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import image from "../assets/logo.svg"
import ThemeToggle from "./ThemeToggle"
import "./navbar.css"

const NavItem = ({ link, onNavigate }) => {
  const className = ["navbar-link", link.className].filter(Boolean).join(" ")

  if (link.href) {
    return (
      <a
        href={link.href}
        className={className}
        onClick={(e) => {
          link.onClick?.(e)
          onNavigate()
        }}
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link
      to={link.to}
      className={className}
      onClick={(e) => {
        link.onClick?.(e)
        onNavigate()
      }}
    >
      {link.label}
    </Link>
  )
}

const Navbar = ({ links }) => {
  const compact = links.length <= 1
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((open) => !open)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLogoClick = () => {
    closeMenu()
    if (location.pathname === "/") {
      scrollToTop()
    }
  }

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header className={`navbar${compact ? " navbar--compact" : ""}`}>
      <Link to="/" className="navbar-logo" onClick={handleLogoClick}>
        <img src={image} alt="" className="navbar-logo-image" />
        EXTrack
      </Link>

      <button
        type="button"
        className={`navbar-toggle${menuOpen ? " is-open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <button
          type="button"
          className="navbar-overlay"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <nav className={`navbar-menu${menuOpen ? " is-open" : ""}`}>
        <ThemeToggle />
        <ul className="navbar-list">
          {links.map((link) => (
            <li key={link.label}>
              <NavItem link={link} onNavigate={closeMenu} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
