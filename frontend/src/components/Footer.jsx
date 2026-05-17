import "./footer.css";
import image from "../assets/logo_light.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="foot-container">
      <div className="tile">
        <h3>
          {" "}
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </h3>
        <p>
          Your trusted platform for university exchange and <br /> study abroad
          opportunities
        </p>
      </div>

      <div className="tile">
        <h3>Quick Links</h3>
         <ul className='qlist'>
            <li><Link to="/" className='ref'>Home</Link></li>
            <li><Link to="/about" className='ref'>About</Link></li>
            <li><Link to="/program" className='ref'>programs</Link></li>
        </ul>
      </div>

      <div className="tile">
        <h3>Legal</h3>
        <ul className='qlist'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
        </ul>
      </div>

      <div className="tile">
        <h3>Contact Us</h3>
        <p>Email: hello@globalexchange.edu</p>
        <p>Phone: +234 803 123 4567</p>
        <p>Address: 123 University Ave, Abuja, Nigeria</p>
      </div>
    </div>
  );
};

export default Footer;
