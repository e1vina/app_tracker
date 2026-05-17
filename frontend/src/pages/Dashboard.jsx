
import "../components/dashboard.css"

const Dashboard = () => {
  const stats = [
    { number: 6, label: "Applications", color: "#0D0D0D" },
    { number: 2, label: "Accepted", color: "#27500A" },
    { number: 3, label: "In progress", color: "#0C447C" },
    { number: "12d", label: "Next deadline", color: "#A32D2D" },
  ]

  const applications = [
    { flag: "🇧🇪", name: "KU Leuven", program: "Mechanical Eng.", status: "Accepted", badge: "green" },
    { flag: "🇸🇪", name: "Uppsala University", program: "Computer Science", status: "Applied", badge: "blue" },
    { flag: "🇳🇱", name: "VU Amsterdam", program: "Data Science", status: "Planned", badge: "amber" },
    { flag: "🇩🇪", name: "TU Delft", program: "Electrical Eng.", status: "Accepted", badge: "green" },
    { flag: "🇫🇷", name: "Sciences Po", program: "Political Science", status: "Rejected", badge: "red" },
  ]

  const deadlines = [
    { days: "12d", name: "Uppsala University", date: "June 1", color: "#A32D2D" },
    { days: "28d", name: "VU Amsterdam", date: "June 17", color: "#633806" },
    { days: "45d", name: "Politecnico di Milano", date: "July 4", color: "#27500A" },
  ]

  const badgeClass = {
    green: "badge-green",
    blue: "badge-blue",
    amber: "badge-amber",
    red: "badge-red",
  }

  return (
    <div className="dashboard">

      <div className="greeting">
        <h2>Good morning, Adaeze 👋</h2>
        <p>You have 1 deadline coming up in 12 days.</p>
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
          {applications.map((a, i) => (
            <div className="app-row" key={i}>
              <div className="app-flag">{a.flag}</div>
              <div className="app-info">
                <div className="app-name">{a.name}</div>
                <div className="app-prog">{a.program}</div>
              </div>
              <span className={`badge ${badgeClass[a.badge]}`}>{a.status}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-title">Upcoming deadlines</div>
          {deadlines.map((d, i) => (
            <div className="deadline-row" key={i}>
              <div className="deadline-days" style={{ color: d.color, background: d.color + '18' }}>{d.days}</div>
              <div>
                <div className="deadline-name">{d.name}</div>
                <div className="deadline-date">{d.date}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard