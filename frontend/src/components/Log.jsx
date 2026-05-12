import "./log.css";
import image from "../assets/logo_light.svg";
import { Link, useNavigate} from "react-router-dom";
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

const Log = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // test: prints what user typed

    navigate("/dashboard")
  };

  return (
    <div className="container-section">
      <div className="split-text">
        <div className="split-logo">
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </div>

        <h2 style={{marginBottom: "10px" }}>
          Welcome back, 
        </h2>
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
        <h3> Sign In</h3>
        <p className="no-account">
          {" "}
          Don't have an account?{" "}
          <Link to="/signup" className="">
            {" "}
            Create One Free
          </Link>{" "}
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
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <button type="submit" style={buttonStyles}>
            Log in
          </button>
        </form>
        <p className="no-account" style={{marginTop: '15px'}}>
          By signing in, you agree to our{" "}
          <a href="" className="">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="" className="">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
export default Log;
