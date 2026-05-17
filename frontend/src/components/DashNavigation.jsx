import './dashNavigation.css'
import image from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const user = {
  firstName: "Adaeze",
  lastName: "Okonkwo",
}

const initials = user.firstName[0] + user.lastName[0]

const navigationStyles = {
  width: 'auto',
  margin: '10px 2px',
  display: 'flex',
  alignItems: 'center',
  fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
  color: 'black',
}

const listStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  listStyle: 'none',
  fontSize: '16px',
  marginLeft: 'auto', // ← pushes everything to the right
}

const DashNavigation = () => {
  return (
    <div className='Navigation' style={navigationStyles}>   
        <Link to="/" className='logo'>
            <img src={image} alt="logo" className='logo-image'/> 
            EXTrack</Link>
        <ul className='Navlist' style={listStyles}>
            <li><Link to="/dashboard" className='ref'>Dashboard</Link></li>
            <li><Link to="/application" className='ref'>Applications</Link></li>
            <li><Link to="/universities" className='ref'>Universities</Link></li>
            <li><Link to="/profile" className='ref'>Profile</Link></li>
        </ul>

        <Link to="/profile" className='dash-avatar'>
        {initials}
      </Link>
    </div>
    )
}
export default DashNavigation  