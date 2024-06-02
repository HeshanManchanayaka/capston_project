import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';


const ZenFitLifeMethods = () => {
  const methods = [
    {
      title: 'Music therapy',
      image: '../src/assets/1028.jpg', 
    },
    {
      title: 'Mind Relaxing with YOGA',
      image: '../src/assets/arms-beautiful-beauty-1882004.jpg', 
    },
    {
      title: 'Meditation',
      image: '../src/assets/meditation-8505367_1280.jpg',
    },
    {
      title: 'Counseling',
      image: '../src/assets/shutterstock_1125091478.jpg',
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>What’s type of method You like to Keep Your</h1>
      <div style={styles.grid}>
        {methods.map((method, index) => (
          <div className="card" style={styles.card} key={index}>
            <div
              className="cardImage"
              style={{ ...styles.cardImage, backgroundImage: `url(${method.image})` }}
            ></div>
            <button className="button" style={styles.button}>{method.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: '#e8f5e9',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 2fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    width: '450px',
  },
  cardImage: {
    width: '100%',
    paddingBottom: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.3s ease',
  },
  button: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

// CSS-in-JS for hover effects
const appStyles = `
  .card:hover {
    transform: scale(1.05);
  }
  .cardImage:hover {
    transform: scale(1.05);
  }
  .button:hover {
    background-color: #94c890;
  }
`;

const App = () => (
  <div>
    <style>{appStyles}</style>
    <ZenFitLifeMethods />
  </div>
);

export default App;
