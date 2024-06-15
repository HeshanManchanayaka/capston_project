
import "./Home.css";
import Footer from "../component/Footer";
import Navbar from "../home/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <div className="hero-text" data-aos="fade-down">
          <h1>Mindfulness &amp; Healthy Life</h1>
          <p>Connect to your inner flow..</p>
        </div>
        <button className="join-button" data-aos="fade-up">
          <a href="./register">Join Our Classes</a>
        </button>
      </div>

      <div className="container1">
        <div className="left-side" data-aos="fade-up">
          <img
            src="your-image-url.jpg" // Add your image URL here
            alt="Mindfulness"
            className="responsive-image"
          />
        </div>
        <div className="right-side" data-aos="fade-up">
          <p>
            Mindfulness involves staying present and fully engaging with the moment, which can significantly enhance a healthy life. By reducing stress, improving emotional regulation, and fostering mental clarity, mindfulness practices contribute to better physical health, improved relationships, and a greater sense of overall well-being and balance in daily life.
          </p>
        </div>
      </div>

      <div className="side-by-side">
        <h2>Choose Your Option</h2>
        <div className="side-section left-section" data-aos="fade-down">
          <h2><a href="">Physical Health</a></h2>
          <p>Good physical health enhances energy levels, improves mood, reduces risk of chronic diseases, boosts immune function, and promotes longevity, contributing to a better quality of life.</p>
        </div>
        <div className="side-section right-section" data-aos="fade-down">
          <h2><a href="./options">Mindfulness</a></h2>
          <p>Mindfulness reduces stress, enhances focus, improves emotional regulation, boosts mental clarity, and promotes overall well-being and resilience.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
