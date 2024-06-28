import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import bgImage from '../assets/Photos/bc2.jpeg';
import Calendar from './Calender';
import Button from 'react-bootstrap/Button';
import profile from '../assets/Photos/profile.jpg';


export default function Edit() {
  const styles = {
    container: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      padding: '20px',
      display: 'grid',
      gap: '10px',
      alignItems: 'center'
    },
    label: {
      display: 'block',
      margin: '10px 0 5px'
    }
  };

  return (
    <div style={styles.container}>
      <Container>
        <Row style={{ textAlign: 'center' }}>
          <h1>Edit Your Profile</h1>
        </Row>

        <br />

        <Row>
          
          <Col >
          <Image src={profile} thumbnail style={{width:'100px'}} />
        </Col>
          
          <Col>
            <Form.Group>
              <Form.Label><b>Email :</b></Form.Label>
              <Form.Control placeholder="Enter your email"/>
            </Form.Group>
          </Col>
        </Row>

        <br />

        <Row>
          <Col>
            <Form.Group>
              <Form.Label><b>Name :</b></Form.Label>
              <Form.Control placeholder="Enter your name"  style={{ width: '70%' }} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label><b>More details :</b></Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Col>
        </Row>

        <br />

        <Row >          
          <Col>
          <Row>
            <Form.Group>
              <Form.Label><b>Role :</b></Form.Label>
              <Form.Control placeholder="Enter your role" style={{ width: '70%' }} />
            </Form.Group>
            </Row>

            <br /><br />

            <Row>
              <Col >
                <Form.Group>
                <Form.Label><b>Cnotact No  :</b></Form.Label>
                <Form.Control placeholder="Enter your number" style={{ width: '70%' }} />
                </Form.Group> 
              </Col>
            </Row>

            <br /><br /><br /><br />

            <Row>
              <Col >
              <Button variant="success" style={{width: '70%'}}>Submit</Button>{' '}
              </Col>
            </Row>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label><b>Edit your calendar :</b></Form.Label>
              <Calendar/>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
