import "./info.css";
import Icon1 from "../assets/appt_icon.png";
import Icon2 from "../assets/uni.png";
import Icon3 from "../assets/bell.png";
import Icon4 from "../assets/checklist.png";
import Icon5 from "../assets/progress.png";
import Icon6 from "../assets/student.png";

const containerStyle = {
  display: "grid",
  justifyContent: "space-between",
  gap: "20px",
};

const cardStyle = {
  width: "20rem",
  height: "auto",
  // border: "1px solid black",
};

const Info = () => {
  return (
    <div id="info">
      <div className="about-heading">
        <h1 className="about">About Us</h1>
      </div>

      <div style={containerStyle} className="card-container">
        <div className="card" style={cardStyle}>
          <h1>
            <img src={Icon1} alt="" className="icon-image" />
          </h1>
          <h3>Application tracker</h3>
          <p>
            Track every application with status, deadlines, and a document
            checklist — all in one view.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <h1>
            <img src={Icon2} alt="" className="icon-image" />
          </h1>
          <h3>University directory</h3>
          <p>
            Browse 48+ partner universities with requirements, deadlines, and
            program details.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <h1>
            <img src={Icon3} alt="" className="icon-image" />
          </h1>
          <h3>Deadline alerts</h3>
          <p>
            Never miss a submission date. Color-coded urgency alerts keep your
            timeline in check.
          </p>
        </div>
      </div>
      <div style={{ width: "20%", margin: "0 auto" }}></div>

      <div style={containerStyle} className="card-container card-container-2">
        <div className="card" style={cardStyle}>
          <h1>
            <img src={Icon4} alt="" className="icon-image" />
          </h1>
          <h3>Document checklist</h3>
          <p>
            Track transcripts, letters, and certificates per application so you
            always know what's missing.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <h1>
            <img src={Icon5} alt="" className="icon-image" />
          </h1>
          <h3>Progress dashboard</h3>
          <p>
            Get a bird's-eye view of all your applications and document
            completion at a glance.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <h1>
            <img src={Icon6} alt="" className="icon-image" />
          </h1>
          <h3>Student profile</h3>
          <p>
            Store your GPA, test scores, and languages once — auto-fill into new
            applications.
          </p>
        </div>
      </div>
      <div style={{ width: "20%", margin: "0 auto" }}></div>
    </div>
  );
};
export default Info;
