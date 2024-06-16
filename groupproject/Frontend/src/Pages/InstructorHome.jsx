import React, { useEffect } from 'react';
import axios from 'axios';

import CardView from '../componenets/CardView'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import bgImage from '../assets/Photos/background2.png';
import img1 from '../assets/Photos/ins3.jpg';
import img2 from '../assets/Photos/ins1.jpg';
import img3 from '../assets/Photos/ins4.jpg';
import img4 from '../assets/Photos/ins2.jpg';
import {Link} from 'react-router-dom';

export default function InstructorHome() {
  const [data, setData] = React.useState([]);
  
  const backgroundImageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px'
  };

  function fetchData() {
    axios.get('http://localhost:5000/api/instructors')
      .then((response) => setData(response.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function CardGen() {
    return data.map((instructor, index) => {
      return (
        CardView({ instructor ,index})
      )})
  }


  return (
    <div>
      <Container style={{background:'cover'}}>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h1>Discover Your Ideal Instructor</h1>
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: 'center' }}>
            "Find your perfect instructor match for personalized guidance and support."
          </Col>
        </Row>

        <br />

        <div className="background-image" style={backgroundImageStyle}>         
          <Row>
          <CardGen />
          </Row>
        </div>
      </Container>
    </div>
  );
}
