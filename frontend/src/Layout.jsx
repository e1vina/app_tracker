import Navigation from "./components/Navigation"
import { Outlet } from "react-router-dom"
import "./styles/layout.css"

const Layout = () => {
  return (
    <div className="app-layout">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
