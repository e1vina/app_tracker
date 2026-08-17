import "./sign.css"
import "./log.css"
import image from "../assets/logo_light.svg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useToast } from "../context/ToastContext.jsx"

const Sign = () => {
  const navigate = useNavigate()
  const { showSuccess, showError, showWarning } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    homeUniversity: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match")
      return
    }

    if (!formData.agreed) {
      showWarning("Please agree to the Terms of Service")
      return
    }

    // Send registration request to backend
    (async () => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.email,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            homeUniversity: formData.homeUniversity,
          })
        })
        if (res.ok) {
          showSuccess('Registration successful — please log in')
          navigate('/login')
        } else {
          const data = await res.json()
          showError(data.message || 'Registration failed')
        }
      } catch (err) {
        console.error(err)
        showError('Network error while registering')
      }
    })()
  }

  return (
    <div className="container-section">
      <div className="split-text">
        <div className="split-logo">
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </div>

        <h2 style={{ marginBottom: "0", lineHeight: "1.1" }}>Start tracking</h2>
        <h2 style={{ marginTop: "0", lineHeight: "1.1" }}>your study abroad journey today!</h2>
        <p className="pick">
          Set up takes under 2 minutes. Add your first application right after —
          no credit card needed.
        </p>
        <p className="text-body">Exchange & study abroad in one tracker</p>
        <p className="text-body">Per-application document checklists</p>
        <p className="text-body">Deadline countdown & urgency alerts</p>
        <p className="text-body">Your data is private & secure</p>
      </div>

      <div className="value-text">
        <div className="auth-panel">
          <h3>Create Your Account</h3>
          <p className="no-account">
            Already have one? <Link to="/login">Log In</Link>
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="homeUniversity"
                placeholder="Home School Name"
                value={formData.homeUniversity}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="agreed"
                id="agreed"
                checked={formData.agreed}
                onChange={handleChange}
              />
              <label htmlFor="agreed">
                I agree to the{" "}
                <a href="" className="signup-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="" className="signup-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className="signup-btn">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Sign
