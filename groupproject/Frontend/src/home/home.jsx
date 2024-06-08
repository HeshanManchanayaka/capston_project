import "./Home.css";
import Footer from "../component/Footer";

function Home() {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-text" data-aos="fade-down">
          <h1>Mindfulness &amp; Healthy life</h1>
          <p>Connect to your inner flow..</p>
        </div>
        <button className="join-button" data-aos="fade-up">
          <a href="./EditProfile">Join Our Classes</a>
        </button>
      </div>

      <div className="container1">
        <div className="left-side" data-aos="fade-up">
          <img
            src="../assets/user/log1.png"
            alt="Example"
            className="responsive-image"
          />
        </div>
        <div className="right-side"  data-aos="fade-up">
          <p>
            This is an example paragraph. Replace this text with any content you
            like. It will stay on the right side of the image on larger screens
            and stack below the image on smaller screens.
          </p>
        </div>
      </div>



      <div className="side-by-side">
        <div className="side-section left-section" data-aos="fade-down">
          <h2><a href="">Mindfulness</a></h2>
          <p>Details about the left section.</p>
        </div>
        <div className="side-section right-section" data-aos="fade-down">
        <h2><a href="">Mindfulness</a></h2>
          <p>Details about the right section.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
