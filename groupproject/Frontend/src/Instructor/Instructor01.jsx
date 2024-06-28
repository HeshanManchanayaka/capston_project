import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import bgImage from '../../public/Instructor/bc1.jpeg';
import Col from 'react-bootstrap/Col';
import Calendar from './Calender';

export default function Instructor01() {
  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Container>
        <Row>
          <Col style={{textAlign:'center'}}><h1>More Details About Your Instructor</h1></Col>
        </Row>
        <br /><br />
        <Row>
          <Col sm={4}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={img1} />
              <br />
              <Card.Body>
                <Card.Title>Instructor 01</Card.Title>
                <br />
                <Card.Text>
                  <li>Name</li>
                  <li>Contact No</li>
                  <li>Email</li>
                  <li>zmore Details</li>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={8}>
            <Card>
              <Card.Body>This is some text within a card body.</Card.Body>
              <Calendar />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
