import "./Home.css";
import Footer from "../component/Footer"; 
function Home(){
  
  return (
  <div>
    <div className="hero-section" >
      <div className="hero-text">
      <h1>Mindfulness &amp; Healthy life</h1>
      <p>Connect to your inner life</p>
      </div>
      <button className="join-button"><a href="./login">Join Our Classes</a></button>
    </div>
    <Footer/>
    </div>
  )
}

export default Home;