import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    homeUniversity: "",
    gpa: "",
    studyYear: "Year 1",
    targetSemester: "Spring 2026",
    languages: "",
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch('/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const userData = await res.json();
        const newFormData = {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          homeUniversity: userData.homeUniversity || '',
          gpa: userData.gpa || '',
          studyYear: userData.studyYear || 'Year 1',
          targetSemester: userData.targetSemester || 'Spring 2026',
          languages: userData.languages || '',
        };
        setFormData(newFormData);
        setOriginalFormData(newFormData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(originalFormData);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        navigate('/login');
        return;
      }

      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await res.json();
      setOriginalFormData(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

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
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Languages</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Current GPA</label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Study year</label>
              <select
                name="studyYear"
                value={formData.studyYear}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              >
                <option>Autumn 2025</option>
                <option>Spring 2026</option>
                <option>Autumn 2026</option>
                <option>Spring 2027</option>
              </select>
            </div>
          </div>

          {isEditing && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="save-btn" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save changes'}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        <div style={{
          display: 'flex',
          flexDirection: 'row',     // Explicitly forces them side-by-side
          justifyContent: 'center', // Centers them horizontally
          alignItems: 'stretch',    // Forces both buttons to be the exact same height
          gap: '15px',
          marginTop: '3rem',
          width: '100%',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {!isEditing && (
            <button
              type="button"
              className="edit-btn"
              onClick={handleEditClick}
              style={{
                flex: 1,
                margin: 0,          // Strips out any rogue external margins pulling it up/down
                padding: '12px 0',  // Fixed vertical padding, zero horizontal to let flex handle width
                boxSizing: 'border-box'
              }}
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{
              flex: 1,
              margin: 0,          // Strips out rogue margins
              padding: '12px 0',  // Identical vertical padding
              boxSizing: 'border-box'
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
