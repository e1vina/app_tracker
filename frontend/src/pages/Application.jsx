import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../components/application.css"

const Application = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])

  // LOAD DATA
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("applications")) || []
    setApplications(saved)
  }, [])

  // DELETE APPLICATION
  const deleteApplication = (id) => {
    const updated = applications.filter(
      (app) => app.id !== id
    )

    setApplications(updated)
    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    )
  }

  // EDIT APPLICATION
  const editApplication = (app) => {
    navigate("/application/edit", {
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

            {applications.map((app) => (
              <div
                className="application-card"
                key={app.id}
              >

                {/* TOP */}
                <div className="application-top">

                  <div>
                    <h2>
                      {app.universityName}
                    </h2>

                    <p>{app.country}</p>
                  </div>

                  <div
                    className="status-badge"
                    style={{
                      color: getStatusColor(
                        app.status
                      ),
                    }}
                  >
                    {app.status}
                  </div>

                </div>

                {/* DETAILS */}
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
                    <span>
                      {app.deadline || "Not set"}
                    </span>
                  </div>

                </div>

                {/* PROGRESS */}
                <div className="progress-section">

                  <div className="progress-label">
                    <span>Progress</span>
                    <span>
                      {app.progress || 0}%
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${app.progress || 0
                          }%`,
                      }}
                    />
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="card-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editApplication(app)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteApplication(app.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default Application