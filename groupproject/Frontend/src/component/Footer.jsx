
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h1>ZenFit Life</h1>
        <p>Invest in your health.</p>
        <a href="tel:+94777249227" className="footer-phone">+94777249227</a>
        <button className="join-now-btn">Join Now</button>

        <br />
        <div className="footer-social-media">
          <a href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.twitter.com" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></a>
        </div>
        <div className="scroll-to-top">
          <button aria-label="Scroll to top" onClick={scrollToTop}>
            <AiOutlineArrowUp />
          </button>
        </div>
      </div>
      <div className="footer-terms">
        <a href="#terms">Terms & Conditions</a>
      </div>
    </footer>
  );
}

export default Footer;
