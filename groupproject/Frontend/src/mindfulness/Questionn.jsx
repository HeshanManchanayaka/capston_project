import React, { useEffect } from 'react';
import AOS from 'aos';              
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './question.css'; // Custom CSS for additional styling

const MentalHealth = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="C:\Users\HP\capston_project\groupproject\Frontend\src\mindfulness\logoo.png" alt="ZenFitLife" width="30" height="30" className="d-inline-block align-top" />
            ZenFitLife
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Start Here</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Classes</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Membership</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Trainers</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Blog</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Shop</a></li>
              <li className="nav-item"><a className="nav-link btn btn-primary text-white ms-2" href="#">Join</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <center><h1 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '32px', marginBottom: '20px' }}>Mindfulness</h1></center>

      <section className="main-section">
        <div className="content" data-aos="fade-up">
          <p><b>Answer the simple Questions...</b></p>
          <div className="questions-section">
            <form>
              <div className="question" data-aos="fade-right">
                <label htmlFor="q1">Question 1: Do You Like Freedom?</label>
                <div className="buttons">
                  <input type="radio" id="q1-yes" name="q1" value="yes" />
                  <label htmlFor="q1-yes">Yes</label>
                  <input type="radio" id="q1-no" name="q1" value="no" />
                  <label htmlFor="q1-no">No</label>
                </div>
              </div>
              <div className="question" data-aos="fade-left">
                <label htmlFor="q2">Question 2: Do You Need a Listener for Your Life?</label>
                <div className="buttons">
                  <input type="radio" id="q2-yes" name="q2" value="yes" />
                  <label htmlFor="q2-yes">Yes</label>
                  <input type="radio" id="q2-no" name="q2" value="no" />
                  <label htmlFor="q2-no">No</label>
                </div>
              </div>
              <div className="question" data-aos="fade-right">
                <label htmlFor="q3">Question 3: Do You Feel Alone with Yourself?</label>
                <div className="buttons">
                  <input type="radio" id="q3-yes" name="q3" value="yes" />
                  <label htmlFor="q3-yes">Yes</label>
                  <input type="radio" id="q3-no" name="q3" value="no" />
                  <label htmlFor="q3-no">No</label>
                </div>
              </div>
              <div className="question" data-aos="fade-left">
                <label htmlFor="q4">Question 4: Do You Worry About Something?</label>
                <div className="buttons">
                  <input type="radio" id="q4-yes" name="q4" value="yes" />
                  <label htmlFor="q4-yes">Yes</label>
                  <input type="radio" id="q4-no" name="q4" value="no" />
                  <label htmlFor="q4-no">No</label>
                </div>
              </div>
              <button type="submit" data-aos="zoom-in">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <section className="benefits-section">
          <div className="benefits-header">
          <h2>Benefits of Mindfulness</h2>
          </div>
        
          </section>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="benefit-item p-3">
                <img src="../src/assets/calm mind.jpg" alt="Calmer and sharper mind" className="img-fluid rounded mb-2" />
                <p className="text-center font-weight-bold">Calmer and sharper mind</p>
              </div>
              <div className="benefit-item p-3">
                <img src="../src/assets/R.jpg" alt="Better Sleep" className="img-fluid rounded mb-2" />
                <p className="text-center font-weight-bold">Better Sleep</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="benefit-item p-3">
                <img src="../src/assets/kinder.jpg" alt="Happier and Kinder you" className="img-fluid rounded mb-2" />
                <p className="text-center font-weight-bold">Happier and Kinder you</p>
              </div>
              <div className="benefit-item p-3">
                <img src="../src/assets/work.jpg" alt="Increased productivity at work" className="img-fluid rounded mb-2" />
                <p className="text-center font-weight-bold">Increased productivity at work</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="benefit-item p-3">
                <img src="../src/assets/stress.jpg" alt="Stress Free Life" className="img-fluid rounded mb-2" />
                <p className="text-center font-weight-bold">Stress Free Life</p>
              </div>
              <div className="benefit-item p-3">
                <img src="../src/assets/better.jpg" alt="Better at Relationship" className="img-fluid rounded mb-2" />
                <p className="text-center font-weight-bold">Better at Relationship</p>
              </div>
            </div>
          </div>
          </div>
      
     
     
  );
};

export default MentalHealth;
