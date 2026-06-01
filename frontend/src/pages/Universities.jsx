import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../components/universities.css"

const regions = ["all", "africa", "europe", "americas", "asia"]
const types = ["all", "Exchange", "Study Abroad"]

// Calculate match % based on user GPA vs university minGPA
const calculateMatch = (userGPA, minGPA) => {
  const gpa = parseFloat(userGPA)
  const min = parseFloat(minGPA)

  if (!gpa || !min) return null

  if (gpa < min) {
    // below minimum — scale from 0 to 60 based on how close they are
    const deficit = min - gpa
    const score = Math.max(0, 60 - deficit * 30)
    return Math.round(score)
  }

  // above minimum — scale from 70 to 100
  const surplus = gpa - min
  const score = Math.min(100, 70 + surplus * 15)
  return Math.round(score)
}

const getMatchTier = (score) => {
  if (score >= 85) return "high"
  if (score >= 70) return "mid"
  return "low"
}

const getMatchStyle = (score) => {
  if (score >= 85) return { color: "#27500A", background: "#EAF3DE" }
  if (score >= 70) return { color: "#633806", background: "#FAEEDA" }
  return { color: "#791F1F", background: "#FCEBEB" }
}

const Universities = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("all")
  const [type, setType] = useState("all")
  const [universitiesData, setUniversitiesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userGPA, setUserGPA] = useState(null)

  // Get user GPA from localStorage or backend
  useEffect(() => {
    const getUserGPA = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const res = await fetch("/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.ok) {
            const userData = await res.json()
            setUserGPA(userData.gpa || null)
            return
          }
        }
        // fallback to localStorage
        const stored = JSON.parse(localStorage.getItem("user"))
        if (stored?.gpa) setUserGPA(stored.gpa)
      } catch (err) {
        console.error("Could not fetch user GPA:", err)
        const stored = JSON.parse(localStorage.getItem("user"))
        if (stored?.gpa) setUserGPA(stored.gpa)
      }
    }
    getUserGPA()
  }, [])

  // Fetch universities
  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch("http://localhost:5000/api/universities")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
        setUniversitiesData(Array.isArray(data) ? data : [])
        setError(null)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        if (!mounted) return
        setError("Unable to load universities")
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  // Filter + inject calculated match
  const filtered = useMemo(() => {
    if (!universitiesData || universitiesData.length === 0) return []
    const q = search.trim().toLowerCase()

    return universitiesData
      .filter((u) => {
        const matchSearch =
          u.name.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q) ||
          (Array.isArray(u.programs) &&
            u.programs.some((p) => p.toLowerCase().includes(q)))
        const matchRegion = region === "all" || u.region === region
        const matchType = type === "all" || u.type === type
        return matchSearch && matchRegion && matchType
      })
      .map((u) => ({
        ...u,
        calculatedMatch: userGPA
          ? calculateMatch(userGPA, u.minGPA)
          : null,
      }))
      .sort((a, b) => (b.calculatedMatch || 0) - (a.calculatedMatch || 0))
  }, [search, region, type, universitiesData, userGPA])

  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => { setPage(1) }, [search, region, type])

  const currentPageUniversities = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, page])

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage))

  const handleCardClick = (university) => {
    navigate("/application/new", { state: { university } })
  }

  const handleKeyDown = (e, university) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleCardClick(university)
    }
  }

  return (
    <div className="unis-wrapper">
      <div className="unis-page">
        {loading ? (
          <div className="no-results"><p>Loading universities…</p></div>
        ) : error ? (
          <div className="no-results">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <>
            <div className="unis-header">
              <div>
                <h1 className="unis-title">Partner universities</h1>
                <p className="unis-sub">
                  {filtered.length} universities available
                  {userGPA && (
                    <span className="gpa-note"> · Matches based on your GPA ({userGPA})</span>
                  )}
                </p>
              </div>
              <button
                className="unis-add-btn"
                onClick={() => navigate("/application/new")}
              >
                + Add custom
              </button>
            </div>

            <div className="unis-filters">
              <div className="search-bar">
                <i className="ti ti-search" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="Search by name, country or program…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <i
                    className="ti ti-x"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSearch("")}
                    aria-hidden="true"
                  ></i>
                )}
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <span className="filter-label">Region</span>
                  {regions.map((r) => (
                    <button
                      key={r}
                      className={`chip ${region === r ? "on" : ""}`}
                      onClick={() => setRegion(r)}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="filter-group">
                  <span className="filter-label">Type</span>
                  {types.map((t) => (
                    <button
                      key={t}
                      className={`chip ${type === t ? "on" : ""}`}
                      onClick={() => setType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* NO GPA WARNING */}
            {!userGPA && (
              <div className="gpa-warning">
                <i className="ti ti-info-circle" aria-hidden="true"></i>
                Add your GPA in your{" "}
                <span
                  style={{ color: "#534AB7", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </span>{" "}
                to see personalised match scores.
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="no-results">
                <i className="ti ti-building-off" aria-hidden="true"></i>
                <p>No universities match your search.</p>
                <button onClick={() => { setSearch(""); setRegion("all"); setType("all") }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="unis-grid">
                  {currentPageUniversities.map((u) => {
                    const matchScore = u.calculatedMatch
                    const matchStyle = matchScore !== null ? getMatchStyle(matchScore) : { color: "#555560", background: "#F7F7FB" }
                    const matchTier = matchScore !== null ? getMatchTier(matchScore) : "low"

                    return (
                      <div
                        className="uni-card"
                        key={u.name}
                        onClick={() => handleCardClick(u)}
                        onKeyDown={(e) => handleKeyDown(e, u)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View details for ${u.name}`}
                      >
                        <div className="uni-card-top">
                          <div className="uni-flag">{u.flag}</div>
                          <div className="uni-info">
                            <div className="uni-name">{u.name}</div>
                            <div className="uni-country">{u.country}</div>
                          </div>
                          <div
                            className="uni-match"
                            style={matchStyle}
                            data-match-tier={matchTier}
                          >
                            {matchScore !== null ? `${matchScore}% match` : "No GPA set"}
                          </div>
                        </div>

                        <div className="uni-tags">
                          {Array.isArray(u.programs) &&
                            u.programs.map((p) => (
                              <span className="tag" key={p}>{p}</span>
                            ))}
                        </div>

                        <div className="uni-card-bottom">
                          <div className="uni-detail">
                            <span className="detail-label">Min. GPA</span>
                            <span className="detail-val">{u.minGPA}</span>
                          </div>
                          <div className="uni-detail">
                            <span className="detail-label">Type</span>
                            <span
                              className="detail-val"
                              data-type-variant={u.type === "Exchange" ? "exchange" : "study-abroad"}
                            >
                              {u.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {pageCount > 1 && (
                  <div className="unis-pagination">
                    <button
                      type="button"
                      className="pagination-btn"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      ←
                    </button>
                    <div className="pagination-info">Page {page} of {pageCount}</div>
                    <button
                      type="button"
                      className="pagination-btn"
                      onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                      disabled={page === pageCount}
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Universities