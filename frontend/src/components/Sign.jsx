import "./sign.css";
import './log.css'
import image from "../assets/logo_light.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const buttonStyles = {
  color: "#161312",
  fontSize: "16px",
  padding: "10px 100px",
  borderRadius: "3px",
  cursor: "pointer",
  border: "1px solid #161312",
  backgroundColor: "#534AB7",
  fontWeight: "400",
  marginRight: "190px",
  fontFamily: "Nunito, sans-serif",
  marginTop: "25px",
};

const Sign = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    homeUniversity: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.agreed) {
      alert("Please agree to the Terms of Service");
      return;
    }

    console.log(formData);
    navigate("/login");
  };

  return (
    <div className="container-section">
      <div className="split-text">
        <div className="split-logo">
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </div>

        <h2 style={{ marginBottom: "10px" }}>Start tracking</h2>
        <h2>your study abroad journey today!</h2>
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
        <h3> Create Your Account</h3>
        <p className="no-account">
          {" "}
          Already have one?{" "}
          <Link to="/login" className="">
            {" "}
            Log In
          </Link>{" "}
        </p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              {/* <label>First name</label> */}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {/* <label>Last name</label> */}
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
            {/* <label>Email address</label> */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            {/* <label>Home university</label> */}
            <input
              type="text"
              name="homeUniversity"
              placeholder="Home university"
              value={formData.homeUniversity}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              {/* <label>Password</label> */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {/* <label>Confirm password</label> */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
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

          <button type="submit" className="signup-btn" style={buttonStyles}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
export default Sign;
