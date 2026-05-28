import { useTheme } from "../context/ThemeContext"
import "./themeToggle.css"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  )
}

export default ThemeToggle
