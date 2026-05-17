import Navbar from "./Navbar"

const signLogLinks = [{ to: "/", label: "← Back", className: "sign" }]

const SignLogNavigation = () => {
  return <Navbar links={signLogLinks} />
}

export default SignLogNavigation
