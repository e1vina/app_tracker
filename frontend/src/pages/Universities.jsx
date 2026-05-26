import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../components/universities.css"

const universitiesData = [
  {
    flag: "🇩🇪",
    name: "TU Munich",
    country: "Germany",
    programs: ["Engineering", "Computer Science"],
    minGPA: 3.2,
    deadline: "Nov 30",
    language: "English",
    match: 93,
    type: "Exchange",
    region: "europe",
  },
  {
    flag: "🇸🇪",
    name: "KTH Royal Institute",
    country: "Sweden",
    programs: ["Technology", "Engineering"],
    minGPA: 3.0,
    deadline: "Jan 15",
    language: "English",
    match: 88,
    type: "Exchange",
    region: "europe",
  },
  {
    flag: "🇧🇪",
    name: "KU Leuven",
    country: "Belgium",
    programs: ["All programs"],
    minGPA: 3.0,
    deadline: "Feb 1",
    language: "English",
    match: 85,
    type: "Exchange",
    region: "europe",
  },
  {
    flag: "🇳🇱",
    name: "University of Amsterdam",
    country: "Netherlands",
    programs: ["Data Science", "Business"],
    minGPA: 3.1,
    deadline: "Feb 15",
    language: "English",
    match: 82,
    type: "Study Abroad",
    region: "europe",
  },
  {
    flag: "🇨🇦",
    name: "University of Toronto",
    country: "Canada",
    programs: ["All programs"],
    minGPA: 3.3,
    deadline: "Feb 1",
    language: "English",
    match: 81,
    type: "Study Abroad",
    region: "americas",
  },
]

const regions = ["all", "europe", "americas", "asia"]
const types = ["all", "Exchange", "Study Abroad"]

const Universities = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("all")
  const [type, setType] = useState("all")

  const filtered = universitiesData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase()) ||
      u.programs.some((p) =>
        p.toLowerCase().includes(search.toLowerCase())
      )

    const matchRegion =
      region === "all" || u.region === region

    const matchType =
      type === "all" || u.type === type

    return matchSearch && matchRegion && matchType
  })

  const handleCardClick = (university) => {
    navigate("/application/new", {
      state: { university },
    })
  }

  return (
    <div className="unis-wrapper">
      <div className="unis-page">

        <div className="unis-header">
          <h1 className="unis-title">
            Partner universities
          </h1>

          <p className="unis-sub">
            {filtered.length} universities available
          </p>
        </div>

        <div className="unis-filters">

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, country or program…"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="filter-row">

            <div className="filter-group">
              <span className="filter-label">
                Region
              </span>

              {regions.map((r) => (
                <button
                  key={r}
                  className={`chip ${
                    region === r ? "on" : ""
                  }`}
                  onClick={() => setRegion(r)}
                >
                  {r.charAt(0).toUpperCase() +
                    r.slice(1)}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <span className="filter-label">
                Type
              </span>

              {types.map((t) => (
                <button
                  key={t}
                  className={`chip ${
                    type === t ? "on" : ""
                  }`}
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
            <p>
              No universities match your search.
            </p>

            <button
              onClick={() => {
                setSearch("")
                setRegion("all")
                setType("all")
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="unis-grid">

            {filtered.map((u, i) => (
              <div
                className="uni-card"
                key={i}
                onClick={() =>
                  handleCardClick(u)
                }
              >

                <div className="uni-card-top">

                  <div className="uni-flag">
                    {u.flag}
                  </div>

                  <div className="uni-info">

                    <div className="uni-name">
                      {u.name}
                    </div>

                    <div className="uni-country">
                      {u.country}
                    </div>

                  </div>

                  <div
                    className="uni-match"
                    style={{
                      color:
                        u.match >= 85
                          ? "#27500A"
                          : u.match >= 75
                          ? "#633806"
                          : "#555560",

                      background:
                        u.match >= 85
                          ? "#EAF3DE"
                          : u.match >= 75
                          ? "#FAEEDA"
                          : "#F7F7FB",
                    }}
                  >
                    {u.match}% match
                  </div>
                </div>

                <div className="uni-tags">
                  {u.programs.map((p, j) => (
                    <span
                      className="tag"
                      key={j}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="uni-card-bottom">

                  <div className="uni-detail">
                    <span className="detail-label">
                      Min. GPA
                    </span>

                    <span className="detail-val">
                      {u.minGPA}
                    </span>
                  </div>

                  <div className="uni-detail">
                    <span className="detail-label">
                      Deadline
                    </span>

                    <span className="detail-val">
                      {u.deadline}
                    </span>
                  </div>

                  <div className="uni-detail">
                    <span className="detail-label">
                      Type
                    </span>

                    <span
                      className="detail-val"
                      style={{
                        color:
                          u.type === "Exchange"
                            ? "#0C447C"
                            : "#633806",
                      }}
                    >
                      {u.type}
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default Universities