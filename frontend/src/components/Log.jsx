import "./log.css"
import image from "../assets/logo_light.svg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Log = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    navigate("/dashboard")
  }

  return (
    <div className="container-section">
      <div className="split-text">
        <div className="split-logo">
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </div>

        <h2>Welcome back,</h2>
        <h2>Your applications are waiting!</h2>
        <p className="pick">
          Pick up right where you left off — deadlines, documents, and decisions
          all in one place.
        </p>
        <p className="text-body">Track applications across 48+ universities</p>
        <p className="text-body">Deadline alerts & document checklists</p>
        <p className="text-body">Free for all students</p>
      </div>

      <div className="value-text">
        <div className="auth-panel">
          <h3>Sign In</h3>
          <p className="no-account">
            Don&apos;t have an account?{" "}
            <Link to="/signup">Create One Free</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="signin-btn">
              Log in
            </button>
          </form>

          <p className="terms-note">
            By signing in, you agree to our{" "}
            <a href="" className="signin-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="" className="signin-link">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
export default Log
