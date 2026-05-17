import Navbar from "./Navbar"

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const navLinks = [
  { to: "/", label: "Home", onClick: scrollToTop },
  {
    href: "#info",
    label: "About",
    onClick: (e) => {
      e.preventDefault()
      document.getElementById("info")?.scrollIntoView({ behavior: "smooth" })
    },
  },
  { to: "/program", label: "Programs" },
  { to: "/login", label: "Log in", className: "log" },
  { to: "/signup", label: "Sign up", className: "sign" },
]

const Navigation = () => {
  return <Navbar links={navLinks} />
}

export default Navigation
