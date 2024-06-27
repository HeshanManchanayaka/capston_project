import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import bgImage from '../assets/Photos/P.jpeg';
import Col from 'react-bootstrap/Col';
import Calendar from './Calender';
import img1 from '../assets/Photos/ins3.jpg';

export default function Instructor01() {
  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      //padding: '20px'
    }}>
      <Container><br /><br />
        <Row>
          <Col style={{textAlign:'center'}}><h1>Contact Your Instructor</h1></Col>
        </Row>
        <br /><br />
        <Row>
          <Col sm={3}>
            <Card >
              <Card.Img variant="top" src={img1} />
              <br />
              <Card.Body>
                <Card.Title>Instructor 01</Card.Title>
                <Card.Text>
                  <li>Name</li>
                  <li>Contact No</li>
                  <li>Email</li>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={1}></Col>
          <Col sm={7}>
            <Card>
              <Card.Body>Book Your Instructor</Card.Body>
              <Calendar />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
