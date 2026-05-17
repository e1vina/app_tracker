import "./info.css"
import Icon1 from "../assets/appt_icon.png"
import Icon2 from "../assets/uni.png"
import Icon3 from "../assets/bell.png"
import Icon4 from "../assets/checklist.png"
import Icon5 from "../assets/progress.png"
import Icon6 from "../assets/student.png"

const features = [
  {
    icon: Icon1,
    title: "Application tracker",
    description:
      "Track every application with status, deadlines, and a document checklist — all in one view.",
  },
  {
    icon: Icon2,
    title: "University directory",
    description:
      "Browse 48+ partner universities with requirements, deadlines, and program details.",
  },
  {
    icon: Icon3,
    title: "Deadline alerts",
    description:
      "Never miss a submission date. Color-coded urgency alerts keep your timeline in check.",
  },
  {
    icon: Icon4,
    title: "Document checklist",
    description:
      "Track transcripts, letters, and certificates per application so you always know what's missing.",
  },
  {
    icon: Icon5,
    title: "Progress dashboard",
    description:
      "Get a bird's-eye view of all your applications and document completion at a glance.",
  },
  {
    icon: Icon6,
    title: "Student profile",
    description:
      "Store your GPA, test scores, and languages once — auto-fill into new applications.",
  },
]

const Info = () => {
  return (
    <section id="info">
      <div className="info-inner">
        <div className="about-heading">
          <h2 className="about">About Us</h2>
        </div>

        <div className="card-container">
          {features.map((feature) => (
            <article key={feature.title} className="card">
              <img src={feature.icon} alt="" className="icon-image" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Info
