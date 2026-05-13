import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Program from "./pages/Program.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Application from "./pages/Application.jsx";
import Universities from "./pages/Universities.jsx";
import Profile from "./pages/Profile.jsx";
import Layout from "./Layout.jsx";
import DashLayout from "./DashLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/program" element={<Program />} />
          </Route>

          <Route element={<DashLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/application" element={<Application />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
