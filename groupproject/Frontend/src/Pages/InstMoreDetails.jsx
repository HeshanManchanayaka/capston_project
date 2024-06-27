import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../assets/Photos/ins3.jpg';
import bgImage from '../assets/Photos/background2.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const styles = {
    container: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
       // Make sure the container covers the viewport height
    },
  };

export default function InstMoreDetails() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [instructor, setInstructor] = React.useState({});
  

  function fetchInstructor(){
    axios.get('http://localhost:5000/api/instructor/' + email)
    .then((response) => {setInstructor(response.data)
      console.log(response.data)
    })
  }

  useState(() => {
    fetchInstructor()
  }, [])

  return (

    <div style={styles.container}>
      <Container className="d-flex justify-content-center align-items-center">
            <Row>
            <Col xs={6} md={4}>
                <Image src={instructor.profileImage} thumbnail />
            </Col>
            <Col  xs={1}></Col>
            <Col> 
                <Card >
                    <Card.Header>{instructor.role}</Card.Header>
                    <Card.Body>
                        <Row>
            <Card.Title><h1>{instructor.name}</h1></Card.Title>
            <Card.Text>{instructor.moreDetails}</Card.Text>
                        </Row>

                        <br /><br /><br />

                        <Row>
                        <Button  variant="success" style={{width:'35%'}}>*Membership</Button>{' '}
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    </div>
  )
}
