import { useEffect, useState } from "react"
import "../components/dashboard.css"

const Dashboard = () => {
  const [applications, setApplications] = useState([])
  const [firstName, setFirstName] = useState("there")
  const [loading, setLoading] = useState(true) // Added loading state for smooth UX

  // Fetch user name and applications from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        // 1. Fetch User Profile
        const userRes = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (userRes.ok) {
          const userData = await userRes.json()
          setFirstName(userData.firstName || "there")
        }

        // 2. Fetch Live Applications (Fixes the missing deadline bug)
        const appRes = await fetch("/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (appRes.ok) {
          const appData = await appRes.json()
          setApplications(appData)
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const total = applications.length
  const accepted = applications.filter(a => a.status === "Accepted").length
  const inProgress = applications.filter(a => a.status === "Applied" || a.status === "Planned").length

  // Normalize midnight to prevent day-calculation shifting bugs
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingSorted = applications
    .filter(a => a.deadline)
    .map(a => ({ ...a, _date: new Date(a.deadline) }))
    .filter(a => {
      // Keep deadline if it's today or in the future
      const targetDate = new Date(a._date)
      targetDate.setHours(0, 0, 0, 0)
      return targetDate >= today
    })
    .sort((a, b) => a._date - b._date)

  const nextDays = upcomingSorted.length > 0
    ? Math.ceil((upcomingSorted[0]._date - new Date()) / (1000 * 60 * 60 * 24))
    : null

  const stats = [
    { number: total, label: "Applications", color: "#0D0D0D" },
    { number: accepted, label: "Accepted", color: "#27500A" },
    { number: inProgress, label: "In progress", color: "#0C447C" },
    { number: nextDays !== null ? `${nextDays}d` : "—", label: "Next deadline", color: "#A32D2D" },
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
  const deadlineColors = ["#A32D2D", "#633806", "#27500A"]

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  if (loading) {
    return <div className="dashboard" style={{ padding: "2rem", color: "#666" }}>Loading your dashboard...</div>
  }

  return (
    <div className="dashboard">
      <div className="greeting">
        <h2>{greeting}, {firstName} 👋</h2>
        <p className="zen-tokyo-zoo-regular">
          {nextDays !== null
            ? `You have a deadline coming up in ${nextDays} days.`
            : "No upcoming deadlines."}
        </p>
      </div>

      <div className="stat-row">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-number" style={{ color: s.color }}>{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="panels">
        <div className="panel">
          <div className="panel-title">Recent applications</div>
          {recentApps.length === 0 ? (
            <p style={{ color: "#999", fontSize: "0.9rem" }}>No applications yet.</p>
          ) : (
            recentApps.map((a) => (
              <div className="app-row" key={a._id || a.id}>
                <div className="app-flag">
                  {a.flag || flagMap[a.country] || "🏳️"}
                </div>
                <div className="app-info">
                  <div className="app-name">{a.universityName}</div>
                  <div className="app-prog">{a.program}</div>
                </div>
                <span className={`badge ${badgeClass[a.status] || "badge-amber"}`}>
                  {a.status}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="panel">
          <div className="panel-title">Upcoming deadlines</div>
          {upcomingDeadlines.length === 0 ? (
            <p style={{ color: "#999", fontSize: "0.9rem" }}>No upcoming deadlines.</p>
          ) : (
            upcomingDeadlines.map((d, i) => {
              const daysLeft = Math.ceil((d._date - new Date()) / (1000 * 60 * 60 * 24))
              const color = deadlineColors[i]
              return (
                <div className="deadline-row" key={d._id || d.id}>
                  <div
                    className="deadline-days"
                    style={{ color, background: color + "18" }}
                  >
                    {daysLeft <= 0 ? "Today" : `${daysLeft}d`}
                  </div>
                  <div>
                    <div className="deadline-name">{d.universityName}</div>
                    <div className="deadline-date">{formatDate(d.deadline)}</div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard