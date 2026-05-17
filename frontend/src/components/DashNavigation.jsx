import Navbar from "./Navbar"

const user = {
  firstName: "Adaeze",
  lastName: "Okonkwo",
}

const initials = user.firstName[0] + user.lastName[0]

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/application", label: "Applications" },
  { to: "/universities", label: "Universities" },
  { to: "/profile", label: "Profile" },
  { to: "/profile", label: initials, className: "dash-avatar" },
]

const DashNavigation = () => {
  return <Navbar links={navLinks} />
}

export default DashNavigation