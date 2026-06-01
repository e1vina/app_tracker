import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "../components/addApplication.css"

const defaultChecklist = {
  transcript: false,
  passport: false,
  motivationLetter: false,
  languageCertificate: false,
  recLetter1: false,
  recLetter2: false,
  learningAgreement: false,
  homeApproval: false,
}

const checklistLabels = {
  transcript: "Official transcript",
  passport: "Passport copy",
  motivationLetter: "Motivation letter",
  languageCertificate: "Language certificate",
  recLetter1: "Recommendation letter 1",
  recLetter2: "Recommendation letter 2",
  learningAgreement: "Learning agreement",
  homeApproval: "Home university approval",
}

const AddApplication = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const university = location.state?.university || null

  const [formData, setFormData] = useState({
    universityName: university?.name || "",
    country: university?.country || "",
    program: "",
    type: university?.type || "Exchange",
    status: "Planned",
    deadline: "",
    semester: "Autumn 2025",
    notes: "",
    checklist: defaultChecklist,
    flag: university?.flag || "🎓",
    programs: university?.programs || [],
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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

  const checkedCount = Object.values(formData.checklist).filter(Boolean).length
  const totalCount = Object.keys(formData.checklist).length
  const progressPercent = Math.round((checkedCount / totalCount) * 100)
  const isComplete = progressPercent === 100

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const newApp = {
      ...formData,
      programs: university?.programs || formData.programs || [],
      progress: progressPercent,
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newApp),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.message || 'Could not save application')
        return
      }

      navigate('/application')
    } catch (error) {
      console.error(error)
      alert('Network error while saving application')
    }
  }

  return (
    <div className="add-app-wrapper">
      <div className="add-app-page">

        {/* HEADER */}
        <div className="add-app-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div>
            <h1 className="add-app-title">New application</h1>
            <p className="add-app-sub">
              {university ? `Applying to ${university.name}` : "Fill in your application details"}
            </p>
          </div>
        </div>

        {/* UNIVERSITY PREVIEW */}
        {university && (
          <div className="uni-preview">
            <div className="uni-preview-flag">{university.flag}</div>
            <div className="uni-preview-info">
              <div className="uni-preview-name">{university.name}</div>
              <div className="uni-preview-meta">
                {university.country} · Min. GPA {university.minGPA} · {university.language}
              </div>
            </div>
            <div
              className="uni-preview-match"
              style={{
                color: university.match >= 85 ? "#27500A" : university.match >= 75 ? "#633806" : "#555560",
                background: university.match >= 85 ? "#EAF3DE" : university.match >= 75 ? "#FAEEDA" : "#F7F7FB"
              }}
            >
              {university.match}% match
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-app-form">
          <div className="form-cards-row">

            {/* LEFT — university details */}
            <div className="form-card">
              <div className="form-section-title">University & program</div>

              <div className="form-group full">
                <label>University name</label>
                <input
                  type="text"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  placeholder="e.g. University of Amsterdam"
                  required
                  disabled={!!university}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  {university ? (
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      disabled
                    />
                  ) : (
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select country…</option>
                      <option>Germany</option>
                      <option>Sweden</option>
                      <option>Netherlands</option>
                      <option>Belgium</option>
                      <option>France</option>
                      <option>Canada</option>
                      <option>USA</option>
                      <option>Japan</option>
                      <option>Australia</option>
                      <option>Italy</option>
                      <option>South Korea</option>
                      <option>Brazil</option>
                      <option>Other</option>
                    </select>
                  )}
                </div>
                <div className="form-group">
                  <label>Program / department</label>
                  {university?.programs?.length ? (
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select program…</option>
                      {university.programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science"
                      required
                    />
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Application type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option>Exchange</option>
                    <option>Study Abroad</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option>Planned</option>
                    <option>Applied</option>
                    <option>Accepted</option>
                    <option>Waitlisted</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Application deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Semester / year</label>
                  <select name="semester" value={formData.semester} onChange={handleChange}>
                    <option>Autumn 2025</option>
                    <option>Spring 2026</option>
                    <option>Autumn 2026</option>
                    <option>Spring 2027</option>
                  </select>
                </div>
              </div>

              <div className="form-group full">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Language requirements, contacts, special instructions…"
                  rows={3}
                />
              </div>
            </div>

            {/* RIGHT — checklist */}
            <div className="form-card">
              <div className="form-section-title">Document checklist</div>

              <div className="checklist-progress">
                <div className="checklist-progress-label">
                  <span>{checkedCount} of {totalCount} documents</span>
                  <span
                    className={`progress-badge ${isComplete ? "complete" : ""}`}
                  >
                    {isComplete ? "✓ Completed" : `${progressPercent}% done`}
                  </span>
                </div>
                <div className="checklist-bar">
                  <div
                    className={`checklist-fill ${isComplete ? "complete" : ""}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="checklist-grid">
                {Object.keys(formData.checklist).map((key) => (
                  <label
                    key={key}
                    className={`checklist-item ${formData.checklist[key] ? "checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData.checklist[key]}
                      onChange={handleChecklistChange}
                    />
                    <span className="checkmark">
                      {formData.checklist[key] ? "✓" : ""}
                    </span>
                    <span className="checklist-label">{checklistLabels[key]}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save application
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddApplication