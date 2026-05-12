
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Program from "./pages/Program.jsx"
import LogIn from "./pages/LogIn.jsx"
import SignUp from "./pages/SignUp.jsx" 
import Layout from "./Layout.jsx"



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/program" element={<Program />} />
          </Route>

            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

      

