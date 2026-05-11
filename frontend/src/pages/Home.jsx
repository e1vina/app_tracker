import Top from "../components/Top"
import Image from "../assets/top.png"
import Rates from "../components/Rates";
import Info from "../components/Info";

const imageStyle = {
  display: "block",
  margin: "0 auto",
  // placeItems: 'center',
};

const Home = () => {
  return (
    <div>
      <Top />
       <img src={Image} alt="" height={576} width={1024} style={imageStyle} />
      <Rates />
      <Info />
    </div>
  )
}

export default Home