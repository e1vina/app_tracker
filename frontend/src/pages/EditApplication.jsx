import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "../components/editApplication.css"

const EditApplication = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const app = location.state?.app

  if (!app) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No application found</h2>
        <button onClick={() => navigate("/application")}>
          Go back
        </button>
      </div>
    )
  }

  const [formData, setFormData] = useState({
    ...app,
    checklist: app.checklist || {},
    programs: app.programs || [],
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChecklistChange = (e) => {
    setFormData({
      ...formData,
      checklist: {
        ...formData.checklist,
        [e.target.name]: e.target.checked,
      },
    })
  }

  const calculateProgress = (checklist) => {
    const items = Object.keys(checklist)
    if (items.length === 0) return 0
    const checked = Object.values(checklist).filter(Boolean).length
    return Math.round((checked / items.length) * 100)
  }

  const handleSave = (e) => {
    e.preventDefault()

    const progress = calculateProgress(formData.checklist)
    const updatedFormData = {
      ...formData,
      progress,
    }

    const existing =
      JSON.parse(localStorage.getItem("applications")) || []

    const updated = existing.map((a) =>
      a.id === formData.id ? updatedFormData : a
    )

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    )

    navigate("/application")
  }

  return (
    <div className="add-app-wrapper">
      <div className="add-app-page">

        <div className="page-header">
          <button type="button" className="btn-back" onClick={() => navigate("/application")}>
            &larr; Back
          </button>
          <div className="header-titles">
            <h1>Edit application</h1>
            <p>Modifying details for {formData.universityName}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="add-app-form">
          <div className="form-cards-container">

            {/* LEFT CARD: UNIVERSITY & PROGRAM */}
            <div className="form-card">
              <div className="card-header">
                <span className="card-title">UNIVERSITY & PROGRAM</span>
                <div className="title-line"></div>
              </div>

              <div className="input-group full-width">
                <label>University Name</label>
                <input
                  name="universityName"
                  value={formData.universityName}
                  disabled
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    disabled
                  />
                </div>

                <div className="input-group">
                  <label>Program / Department</label>
                  {Array.isArray(formData.programs) && formData.programs.length > 0 ? (
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select program…</option>
                      {formData.programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name="program"
                      placeholder="e.g. Computer Science"
                      value={formData.program}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Planned</option>
                    <option>Applied</option>
                    <option>Accepted</option>
                    <option>Waitlisted</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Application deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT CARD: DOCUMENT CHECKLIST */}
            <div className="form-card">
              <div className="card-header">
                <span className="card-title">DOCUMENT CHECKLIST</span>
                <div className="title-line"></div>
              </div>

              <div className="Echecklist-container">
                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="transcript"
                    checked={formData.checklist.transcript || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Official transcript</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="passport"
                    checked={formData.checklist.passport || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Passport copy</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="motivationLetter"
                    checked={formData.checklist.motivationLetter || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Motivation letter</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="languageCertificate"
                    checked={formData.checklist.languageCertificate || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Language certificate</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="recLetter1"
                    checked={formData.checklist.recLetter1 || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Recommendation letter 1</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="recLetter2"
                    checked={formData.checklist.recLetter2 || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Recommendation letter 2</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="learningAgreement"
                    checked={formData.checklist.learningAgreement || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Learning agreement</span>
                </label>

                <label className="Echecklist-item">
                  <input
                    type="checkbox"
                    name="homeApproval"
                    checked={formData.checklist.homeApproval || false}
                    onChange={handleChecklistChange}
                  />
                  <span className="Echecklist-text">Home university approval</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/application")}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save application
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default EditApplication