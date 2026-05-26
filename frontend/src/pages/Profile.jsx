import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Adaeze",
    lastName: "Okonkwo",
    email: "adaeze@unilag.edu.ng",
    homeUniversity: "University of Lagos",
    gpa: "3.8",
    studyYear: "Year 3",
    targetSemester: "Spring 2026",
    languages: "English, French",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Profile saved!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.firstName[0]}
            {formData.lastName[0]}
          </div>
          <div>
            <h2 className="profile-name">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="profile-sub">
              {formData.homeUniversity} · {formData.studyYear}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section-title">Personal info</div>
          <div className="form-grid">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Languages</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section-title">Academic info</div>
          <div className="form-grid">
            <div className="form-group">
              <label>Home university</label>
              <input
                type="text"
                name="homeUniversity"
                value={formData.homeUniversity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Current GPA</label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Study year</label>
              <select
                name="studyYear"
                value={formData.studyYear}
                onChange={handleChange}
              >
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Year 4</option>
                <option>Postgraduate</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target semester</label>
              <select
                name="targetSemester"
                value={formData.targetSemester}
                onChange={handleChange}
              >
                <option>Autumn 2025</option>
                <option>Spring 2026</option>
                <option>Autumn 2026</option>
                <option>Spring 2027</option>
              </select>
            </div>
          </div>

          <button type="submit" className="save-btn">
            Save changes
          </button>
        </form>

        <button onClick={handleLogout} className="logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
