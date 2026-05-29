import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../components/universities.css"

// Data is now fetched from backend API
const regions = ["all", "africa", "europe", "americas", "asia"]
const types = ["all", "Exchange", "Study Abroad"]

const Universities = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("all")
  const [type, setType] = useState("all")
  const [universitiesData, setUniversitiesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch universities on mount
  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('http://localhost:5000/api/universities')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
        setUniversitiesData(Array.isArray(data) ? data : [])
        setError(null)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        if (!mounted) return
        setError('Unable to load universities')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  // 1. Memoized filtering logic to boost performance during user typing
  const filtered = useMemo(() => {
    if (!universitiesData || universitiesData.length === 0) return []

    const q = search.trim().toLowerCase()

    return universitiesData.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        (Array.isArray(u.programs) &&
          u.programs.some((p) => p.toLowerCase().includes(q)))

      const matchRegion = region === 'all' || u.region === region
      const matchType = type === 'all' || u.type === type

      return matchSearch && matchRegion && matchType
    })
  }, [search, region, type, universitiesData])

  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  const handleCardClick = (university) => {
    navigate("/application/new", {
      state: { university },
    })
  }

  useEffect(() => {
    setPage(1)
  }, [search, region, type])

  const currentPageUniversities = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, page])

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage))

  // Helper function to handle 'Enter' or 'Space' keyboard actions for accessibility
  const handleKeyDown = (e, university) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleCardClick(university)
    }
  }

  // Helper utility to calculate match tier cleanly
  const getMatchTier = (matchScore) => {
    if (matchScore >= 85) return "high"
    if (matchScore >= 75) return "mid"
    return "low"
  }

  return (
    <div className="unis-wrapper grenze-gotisch-500">
      <div className="unis-page">
        {loading ? (
          <div className="no-results">
            <p>Loading universities…</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <>
            <div className="unis-header">
              <h1 className="unis-title">Partner universities</h1>
              <p className="unis-sub">{filtered.length} universities available</p>
            </div>

            <div className="unis-filters">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name, country or program…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
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

            {filtered.length === 0 ? (
              <div className="no-results">
                <p>No universities match your search.</p>
                <button
                  onClick={() => {
                    setSearch('')
                    setRegion('all')
                    setType('all')
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="unis-grid">
                  {currentPageUniversities.map((u) => (
                    <div
                      className="uni-card"
                      key={u.name} // using unique data property instead of array index
                      onClick={() => handleCardClick(u)}
                      onKeyDown={(e) => handleKeyDown(e, u)} // Keyboard accessibility
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
                          data-match-tier={getMatchTier(u.match)}
                        >
                          {u.match}% match
                        </div>
                      </div>

                      <div className="uni-tags">
                        {Array.isArray(u.programs) &&
                          u.programs.map((p) => (
                            <span className="tag" key={p}>
                              {p}
                            </span>
                          ))}
                      </div>

                      <div className="uni-card-bottom">
                        <div className="uni-detail">
                          <span className="detail-label">Min. GPA</span>
                          <span className="detail-val">{u.minGPA}</span>
                        </div>

                        <div className="uni-detail">
                          <span className="detail-label">Deadline</span>
                          <span className="detail-val">{u.deadline}</span>
                        </div>

                        <div className="uni-detail">
                          <span className="detail-label">Type</span>
                          <span
                            className="detail-val"
                            data-type-variant={u.type === 'Exchange' ? 'exchange' : 'study-abroad'}
                          >
                            {u.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {pageCount > 1 && (
                  <div className="unis-pagination">
                    <button
                      type="button"
                      className="pagination-btn"
                      aria-label="Previous page"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      ←
                    </button>

                    <div className="pagination-info">
                      Page {page} of {pageCount}
                    </div>

                    <button
                      type="button"
                      className="pagination-btn"
                      aria-label="Next page"
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