import "./log.css";
import image from "../assets/logo_light.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Log = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".split-text > *", {
        x: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(".auth-panel", {
        x: 35,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.4)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: formData.email, password: formData.password })
        })
        const data = await res.json()
        if (res.ok) {
          if (data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
          }
          navigate('/dashboard')
        } else {
          alert(data.message || 'Login failed')
        }
      } catch (err) {
        console.error(err)
        alert('Network error')
      }
    })()
  };

  return (
    <div className="container-section" ref={containerRef}>
      <div className="split-text">
        <div className="split-logo">
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </div>

        <h2 style={{ marginBottom: "0", lineHeight: "1.1" }}>Welcome back,</h2>
        <h2 style={{ marginTop: "0", lineHeight: "1.1" }}>
          Your applications are waiting!
        </h2>
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
  );
};
export default Log;
