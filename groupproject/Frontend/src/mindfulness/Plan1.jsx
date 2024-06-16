import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import { Modal, Button } from 'react-bootstrap';

const ZenFitLife = () => {
  const [viewedDays, setViewedDays] = useState(Array(7).fill(false));
  const [videoUrl, setVideoUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState('');

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile || !title || !description || !day) return;

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('day', day);

    try {
      const response = await fetch('/api/video', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleButtonClick = async (index, day) => {
    const newViewedDays = [...viewedDays];
    newViewedDays[index] = true;
    setViewedDays(newViewedDays);
    setLoading(true);
    console.log(day);
    try {
      const response = await fetch(`http://localhost:5000/api/videos`);
      const data = await response.json();

      // Find the video for the specific day
      const video = data.find(video => video.day === day);
      console.log(video);
      if (video) {
        setVideoUrl(video.url);
      } else {
        console.error('No video found for the specified day');
      }

      setShowModal(true);
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoUrl('');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#d8f2d2' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontWeight: 'bold', color: '#2b882b' }}>
            <img src="logoo.png" alt="ZenFitLife" width="30" height="30" className="d-inline-block align-top" />
            ZenFitLife
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {['Start Here', 'About', 'Classes', 'Membership', 'Trainers', 'Blog', 'Shop'].map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link" href="#" style={{ color: '#54e262' }}>{item}</a>
                </li>
              ))}
              <li className="nav-item">
                <a className="nav-link btn btn-primary text-white ms-2" href="#" style={{ backgroundColor: '#a6e3a1', border: 'none' }}>Join</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <center><h1 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '32px', marginBottom: '20px' }}>Mind Relaxing with Yoga</h1></center>

      <section style={{
        backgroundImage: 'url("../src/assets/planbc.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 20px',
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(231, 245, 235, 0.5)',
          padding: '50px',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            marginBottom: '30px',
            fontSize: '28px',
            color: '#051b09',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            borderBottom: '2px solid #2c3e50',
            paddingBottom: '5px'
          }}>Your Plan</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px'
          }}>
            {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index, day)}
                style={{
                  backgroundColor: viewedDays[index] ? '#94c890' : '#84ea97',
                  border: '1px solid #070e06',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  color: viewedDays[index] ? 'white' : 'black',
                  transition: 'background-color 0.3s ease, transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                {day}
              </button>
            ))}
          </div>

          <button style={{
            marginTop: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >Finish</button>
        </div>
      </section>

      <section style={{
        backgroundColor: '#86e48e9d',
        padding: '30px',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(231, 245, 235, 0.5)',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          marginBottom: '20px',
          textAlign: 'center',
          maxWidth: 'auto',
          margin: '0 auto'
        }}>
          <p style={{
            marginTop: '10px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>The only app in the world that goes beyond mindfulness </p>
        </div>
      </section>

      <section style={{
        backgroundImage: 'url("../src/assets/mindful.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 20px',
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-image 1s ease, transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}></section>

      <footer style={{
        backgroundColor: '#d8f2d2',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: '#2b882b',
            fontFamily: 'Georgia, serif'
          }}>ZenFitLife</h2>
          <p>Invest in your health.</p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <a href="tel:+94777492727" style={{
            marginRight: '10px',
            color: '#54e262',
            textDecoration: 'none'
          }}>+94777492727</a>
          <a href="mailto:info@zenfitlife.com" style={{
            color: '#54e262',
            textDecoration: 'none'
          }}>info@zenfitlife.com</a>
        </div>
        <div>
          <a href="#" style={{ marginRight: '10px', color: '#54e262', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#54e262', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </footer>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yoga Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>Loading...</div>
          ) : (
            videoUrl && (
              <video width="100%" controls autoPlay>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag. 
              </video>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ZenFitLife;