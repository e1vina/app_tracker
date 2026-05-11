import './top.css'

const topStyle={
alignItems: 'center',
justifyContent: 'center',
display: 'flex',
flexDirection: 'column',
margin: 'auto',
fontSize: '48px',
marginTop: '50px',
fontWeight: '900',
fontFamily: ['Arial','Helvetica', 'sans-serif',],
color: '#555560',
}

const subTopStyle={
    fontSize: '18px',
    fontWeight: '400',
}

const Top = () => {
  return (
    <div className='Top' style={topStyle}>
        <p className='Track'>Track every study abroad application,</p>
        <p className='all'>all in one place.</p>

        <div className='subtext' style={subTopStyle}>
            <p className='Manage'>Manage deadlines, documents, and university requirements across all <br />
             your exchange and study abroad applications — so nothing slips through <br />
              the cracks.</p>
        </div>

        <div className="hero_tag">
            <p>Built for international students</p>
        </div>
        
    </div>
    )
}
export default Top 
