import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Instructor04() {
  return (
    <div><Container>

    <Row>
        <Col>More Details About Your Instructor</Col>
    </Row>
  <Row>
    <Col sm={4}>
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the
      bulk of the card's content.
    </Card.Text>
  </Card.Body>
</Card>
    </Col>

    <Col sm={8}>
 <Card>
  <Card.Body>This is some text within a card body.</Card.Body>
</Card>
</Col>
  </Row>
</Container>
</div>
  )
}
