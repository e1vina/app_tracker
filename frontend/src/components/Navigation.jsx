import './navigation.css'
import image from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const navigationStyles= {
  width: 'auto',
  margin: '20px 19px',
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

const Navigation = () => {
   const scrollToInfo = (e) => {
    e.preventDefault()
    document.getElementById("info").scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className='Navigation' style={navigationStyles}>   
        <Link to="/" className='logo'>
            <img src={image} alt="logo" className='logo-image'/> 
            EXTrack</Link>
        <ul className='Navlist' style={listStyles}>
            <li><Link to="/" className='ref'>Home</Link></li>
            <li><a href="#info" onClick={scrollToInfo} className='ref'>About</a></li>
            <li><Link to="/program" className='ref'>programs</Link></li>
            <li><Link to="/login" className='ref log'>Log in</Link></li>
            <li><Link to="/signup" className='ref sign'>Sign up</Link></li>
        </ul>
    </div>
    )
}
export default Navigation