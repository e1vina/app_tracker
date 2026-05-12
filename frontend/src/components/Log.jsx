import "./log.css";
import image from "../assets/logo.svg";
import { Link } from 'react-router-dom'

const Log = () => {
  return (
    <div className="container-section">
      <div className="split-text">
        <h3 className="logo">
          <img src={image} alt="logo" className="logo-image" />
          EXTrack
        </h3>

        <h2> Welcome back. Your applications are waiting.</h2>
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
        <p> Don't have an account? <Link to="/signup" className='ref'> Create One Free</Link> </p>
      </div>

      .
    </div>
  );
};
export default Log;
