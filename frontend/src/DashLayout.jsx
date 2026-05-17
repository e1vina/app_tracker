import DashNavigation from "./components/DashNavigation"
import { Outlet } from "react-router-dom"
import "./styles/layout.css"

const DashLayout = () => {
  return (
    <div className="app-layout">
      <DashNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default DashLayout
