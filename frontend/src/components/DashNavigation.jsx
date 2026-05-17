import Navbar from "./Navbar"

const dashLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/application", label: "Applications" },
  { to: "/universities", label: "Universities" },
  { to: "/profile", label: "Profile" },
]

const DashNavigation = () => {
  return <Navbar links={dashLinks} />
}

export default DashNavigation
