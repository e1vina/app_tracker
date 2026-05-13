import DashNavigation from "./components/DashNavigation"
import { Outlet } from "react-router-dom"

const DashLayout = () => {
    return (
        <div>   
            <DashNavigation />
            <main>   
                <Outlet />
            </main>
        </div>
    )
}   
export default DashLayout;
 