import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../components/application.css"

const Application = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const res = await fetch('/api/applications', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          console.error('Failed to load applications')
          return
        }
        const data = await res.json()
        setApplications(data)
      } catch (error) {
        console.error('Error loading applications:', error)
      }
    }

    fetchApplications()
  }, [navigate])

  const deleteApplication = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.message || 'Could not delete application')
        return
      }

      setApplications((current) => current.filter((app) => (app._id || app.id) !== id))
    } catch (error) {
      console.error('Error deleting application:', error)
      alert('Network error while deleting application')
    }
  }

  const editApplication = (app) => {
    const appId = app._id || app.id
    navigate(`/application/edit/${appId}`, {
      state: { app },
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#27500A"
      case "Rejected":
        return "#8B0000"
      case "Applied":
        return "#0C447C"
      case "Waitlisted":
        return "#633806"
      default:
        return "#555560"
    }
  }

  return (
    <div className="application-wrapper grenze-gotisch-500">
      <div className="application-page">

        {/* HEADER */}
        <div className="application-header">
          <h1>My Applications</h1>

          <p>
            {applications.length} application
            {applications.length !== 1 && "s"}
          </p>
        </div>

        {/* EMPTY STATE */}
        {applications.length === 0 ? (
          <div className="empty-applications">
            <h3>No applications yet</h3>
            <p>
              Start by adding universities and
              tracking your applications.
            </p>

            <button
              onClick={() =>
                navigate("/universities")
              }
            >
              Browse Universities
            </button>
          </div>
        ) : (
          <div className="applications-grid">

            {applications.map((app) => {
              const appId = app._id || app.id
              return (
                <div className="application-card" key={appId}>
                  <div className="application-top">
                    <div>
                      <h2>{app.universityName}</h2>
                      <p>{app.country}</p>
                    </div>
                    <div
                      className="status-badge"
                      style={{ color: getStatusColor(app.status) }}
                    >
                      {app.status}
                    </div>
                  </div>

                  <div className="application-details">
                    <div className="detail-row">
                      <span>Program</span>
                      <span>{app.program}</span>
                    </div>
                    <div className="detail-row">
                      <span>Type</span>
                      <span>{app.type}</span>
                    </div>
                    <div className="detail-row">
                      <span>Semester</span>
                      <span>{app.semester}</span>
                    </div>
                    <div className="detail-row">
                      <span>Deadline</span>
                      <span>{app.deadline || 'Not set'}</span>
                    </div>
                  </div>

                  <div className="progress-section">
                    <div className="progress-label">
                      <span>Progress</span>
                      <span>{app.progress || 0}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${app.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => editApplication(app)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteApplication(appId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}

          </div>
        )}
      </div>
    </div>
  )
}

export default Application