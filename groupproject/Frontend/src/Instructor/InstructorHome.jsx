import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import bgImage from '../assets/Photos/P.jpeg';
import img1 from '../assets/Photos/icon1.jpg';

export default function InstructorHome() {
  const backgroundImageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px'
  };

  return (
    <div>
      <Container>
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
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <a href="/instructor1" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card.Img variant="top" src={img1} style={{height:'300px'}}/>
                  <Card.Body>
                    <Card.Title>Instructor 1</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </a>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <a href="/instructor2" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={img1} style={{height:'300px'}}/>
                  <Card.Body>
                    <Card.Title>Instructor 2</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </a>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <a href="/instructor3" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={img1} style={{height:'300px'}}/>
                  <Card.Body>
                    <Card.Title>Instructor 3</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </a>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <a href="/instructor4" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={img1} style={{height:'300px'}}/>
                  <Card.Body>
                    <Card.Title>Instructor 4</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </a>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
