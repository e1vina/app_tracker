import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import "../components/dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [firstName, setFirstName] = useState("there")
  const [loading, setLoading] = useState(true)
  const dashRef = useRef(null)

  // Fetch user name and applications from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setLoading(false)
          return
        }

        // 1. Fetch User Profile
        const userRes = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (userRes.ok) {
          const userData = await userRes.json()
          setFirstName(userData.firstName || "there")
        }

        // 2. Fetch Live Applications
        const appRes = await fetch("/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (appRes.ok) {
          const appData = await appRes.json()
          setApplications(Array.isArray(appData) ? appData : [])
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Animate elements once loaded
  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      gsap.from(".greeting", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })

      gsap.from(".stat-card", {
        y: 25,
        scale: 0.92,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        delay: 0.15,
        ease: "back.out(1.4)",
      })

      gsap.from(".panel", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        delay: 0.3,
        ease: "power2.out",
      })
    }, dashRef)

    return () => ctx.revert()
  }, [loading])

  const total = applications.length
  const accepted = applications.filter(a => a.status === "Accepted").length
  const inProgress = applications.filter(a => a.status === "Applied" || a.status === "Planned").length

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingSorted = applications
    .filter(a => a.deadline)
    .map(a => ({ ...a, _date: new Date(a.deadline) }))
    .filter(a => {
      const targetDate = new Date(a._date)
      targetDate.setHours(0, 0, 0, 0)
      return targetDate >= today
    })
    .sort((a, b) => a._date - b._date)

  const nextDays = upcomingSorted.length > 0
    ? Math.ceil((upcomingSorted[0]._date - new Date()) / (1000 * 60 * 60 * 24))
    : null

  const stats = [
    {
      number: total,
      label: "Total Applications",
      classType: "total",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      number: accepted,
      label: "Accepted",
      classType: "accepted",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      number: inProgress,
      label: "In Progress",
      classType: "progress",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      number: nextDays !== null ? `${nextDays}d` : "—",
      label: "Next Deadline",
      classType: "deadline",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
  ]

  const badgeClass = {
    Accepted: "badge-green",
    Applied: "badge-blue",
    Planned: "badge-amber",
    Waitlisted: "badge-amber",
    Rejected: "badge-red",
  }

  const flagMap = {
    Belgium: "🇧🇪", Sweden: "🇸🇪", Netherlands: "🇳🇱",
    Germany: "🇩🇪", France: "🇫🇷", Italy: "🇮🇹",
    Spain: "🇪🇸", Portugal: "🇵🇹", Denmark: "🇩🇰",
    Norway: "🇳🇴", Finland: "🇫🇮", Austria: "🇦🇹",
    Switzerland: "🇨🇭", Poland: "🇵🇱", Canada: "🇨🇦",
    USA: "🇺🇸", Japan: "🇯🇵", Australia: "🇦🇺",
    "South Korea": "🇰🇷", Brazil: "🇧🇷",
    "Czech Republic": "🇨🇿",
  }

  const recentApps = [...applications].reverse().slice(0, 5)
  const upcomingDeadlines = upcomingSorted.slice(0, 3)

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard" ref={dashRef}>
      {/* HEADER BANNER */}
      <div className="greeting">
        <div className="greeting-text">
          <h2>
            {greeting}, {firstName}
          </h2>
          <p className="greeting-subtitle">
            {nextDays !== null
              ? `You have a deadline coming up in ${nextDays} day${nextDays === 1 ? "" : "s"}.`
              : "No upcoming deadlines. Ready to explore new programs?"}
          </p>
        </div>

        <div className="greeting-actions">
          <button
            type="button"
            className="dash-action-btn primary"
            onClick={() => navigate("/application/new")}
          >
            + Add Application
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stat-row">
        {stats.map((s, i) => (
          <div className={`stat-card stat-${s.classType}`} key={i}>
            <div className="stat-header">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-number">{s.number}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PANELS */}
      <div className="panels">
        {/* RECENT APPLICATIONS */}
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Recent Applications</h3>
            <button
              type="button"
              className="panel-link-btn"
              onClick={() => navigate("/application")}
            >
              View all &rarr;
            </button>
          </div>

          {recentApps.length === 0 ? (
            <div className="panel-empty">
              <p>No applications created yet.</p>
              <button
                type="button"
                className="dash-action-btn secondary"
                onClick={() => navigate("/universities")}
              >
                Browse Universities
              </button>
            </div>
          ) : (
            <div className="rows-list">
              {recentApps.map((a, idx) => (
                <div
                  className="app-row"
                  key={a._id || a.id || idx}
                  onClick={() => navigate(`/application/edit/${a._id || a.id}`)}
                >
                  <div className="app-flag">
                    {a.flag || flagMap[a.country] || (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    )}
                  </div>
                  <div className="app-info">
                    <div className="app-name">{a.universityName}</div>
                    <div className="app-prog">{a.program || "General Program"} &middot; {a.semester || "Upcoming"}</div>
                  </div>
                  <span className={`badge ${badgeClass[a.status] || "badge-amber"}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UPCOMING DEADLINES */}
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Upcoming Deadlines</h3>
            <button
              type="button"
              className="panel-link-btn"
              onClick={() => navigate("/application")}
            >
              Calendar &rarr;
            </button>
          </div>

          {upcomingDeadlines.length === 0 ? (
            <div className="panel-empty">
              <p>No upcoming deadlines scheduled.</p>
            </div>
          ) : (
            <div className="rows-list">
              {upcomingDeadlines.map((d, i) => {
                const daysLeft = Math.ceil((d._date - new Date()) / (1000 * 60 * 60 * 24))
                const isUrgent = daysLeft <= 7
                return (
                  <div
                    className="deadline-row"
                    key={d._id || d.id || i}
                    onClick={() => navigate(`/application/edit/${d._id || d.id}`)}
                  >
                    <div className={`deadline-days ${isUrgent ? "urgent" : "normal"}`}>
                      {daysLeft <= 0 ? "Today" : `${daysLeft}d`}
                    </div>
                    <div className="deadline-info">
                      <div className="deadline-name">{d.universityName}</div>
                      <div className="deadline-date">{formatDate(d.deadline)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard