import './dashNavigation.css'
import image from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const navigationStyles= {
  width: 'auto',
  margin: '10px 2px',
//   background: '#333',
  display: 'flex',
  justifyContent:'space-between',
  // padding: '10px',
  fontFamily: ['Arial','Helvetica', 'sans-serif',],
  color: 'black',
}  
const listStyles={
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  listStyle: 'none',
  fontSize: '16px',
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
    </div>
    )
}
export default DashNavigation