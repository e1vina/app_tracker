import { useState } from "react"
import "../components/faq.css"

const faqs = [
  {
    category: "general",
    label: "General",
    questions: [
      {
        q: "What is EXTrack?",
        a: "EXTrack is a platform that helps university students manage and track their study abroad and exchange program applications. You can track deadlines, manage required documents, browse partner universities, and monitor your application status — all in one place."
      },
      {
        q: "Is EXTrack free to use?",
        a: "Yes — EXTrack is completely free for all students. There are no hidden fees, subscriptions, or credit card requirements. Just create an account and start tracking."
      },
      {
        q: "What devices can I use EXTrack on?",
        a: "EXTrack works on any device with a modern web browser — laptops, desktops, tablets, and mobile phones. No app download is required."
      },
    ]
  },
  {
    category: "account",
    label: "Account",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign up' on the homepage, fill in your name, university email, home university, and a password. The whole process takes under 2 minutes and you can start adding applications immediately after."
      },
      {
        q: "Can I update my profile information later?",
        a: "Yes. Go to your Profile page from the dashboard navigation. You can update your name, email, GPA, home university, study year, target semester, and languages at any time."
      },
      {
        q: "I forgot my password. What do I do?",
        a: "On the login page, click 'Forgot password?' and enter your email address. You'll receive a reset link within a few minutes. Check your spam folder if you don't see it in your inbox."
      },
    ]
  },
  {
    category: "applications",
    label: "Applications",
    questions: [
      {
        q: "How do I add a new application?",
        a: "From the Applications page, click the 'Add new' button. Fill in the university name, program, application type, status, and deadline. You can also add notes and track required documents per application."
      },
      {
        q: "What application statuses are available?",
        a: "You can set each application to one of five statuses: Planned, Applied, Accepted, Waitlisted, or Rejected. Each status has a distinct color so you can see your progress at a glance on the dashboard."
      },
      {
        q: "How does the document checklist work?",
        a: "Each application has its own document checklist where you can track items like transcripts, motivation letters, recommendation letters, and language certificates. Mark each document as ready, in progress, or missing."
      },
    ]
  },
  {
    category: "universities",
    label: "Universities",
    questions: [
      {
        q: "How many universities are listed on EXTrack?",
        a: "EXTrack currently lists 48+ partner universities across Europe, North America, Asia, and beyond. Each listing includes GPA requirements, application deadlines, available programs, and language requirements."
      },
      {
        q: "What does the match percentage mean?",
        a: "The match percentage shows how well a university fits your academic profile — based on your GPA, study year, program, and language skills. A higher percentage means you're a stronger candidate."
      },
    ]
  },
]

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  let questionIndex = 0

  return (
    <div className="faq-page">

      <div className="faq-hero">
        <h1>Frequently asked questions</h1>
        <p>Everything you need to know about EXTrack and studying abroad.</p>
      </div>

      <div className="faq-cats">
        {["all", "general", "account", "applications", "universities"].map(cat => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? "on" : ""}`}
            onClick={() => {
              setActiveCategory(cat)
              setOpenIndex(null)
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filteredFaqs.map((group) => (
        <div className="faq-group" key={group.category}>
          <div className="faq-group-label">{group.label}</div>
          {group.questions.map((item) => {
            const index = questionIndex++
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => handleToggle(index)}
              >
                <div className="faq-q">
                  <span className="faq-q-text">{item.q}</span>
                  <div className="faq-icon">
                    {isOpen ? "×" : "+"}
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}

      <div className="still-q">
        <h3>Still have questions?</h3>
        <p>Can't find what you're looking for? Get in touch with our support team.</p>
        <a href="mailto:hello@extrack.edu" className="contact-btn">Contact support →</a>
      </div>

    </div>
  )
}

export default FAQ