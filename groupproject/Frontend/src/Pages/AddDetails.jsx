import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import bgImage from '../assets/Photos/bg2.jpeg';
import Button from 'react-bootstrap/Button';
import profile from '../assets/Photos/profile.jpg';

export default function AddDetails() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [profileImage, setProfileImage] = useState(profile);
  const [role, setRole] = useState('');
  const [moreDetails, setMoreDetails] = useState('');
  const [sdesc, setsdesc] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    contactNo: '',
    sdesc: ''
  });

  const handlesdesc = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setsdesc(value);
      setErrors({ ...errors, sdesc: '' });
    } else {
      setErrors({ ...errors, sdesc: 'Only letters are allowed' });
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
      setErrors({ ...errors, name: '' });
    } else {
      setErrors({ ...errors, name: 'Only letters are allowed' });
    }
  };

  const handleContactNoChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setContactNo(value);
      setErrors({ ...errors, contactNo: '' });
    } else {
      setErrors({ ...errors, contactNo: 'Contact number must be 10 digits' });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setErrors({ ...errors, email: 'Invalid email format' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleMoreDetailsChange = (e) => {
    setMoreDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && contactNo && email) {
      const data = {
        email,
        name,
        contactNo,
        profileImage,
        role,
        moreDetails,
        sdesc
      };

      try {
        const response = await axios.post('http://localhost:5000/api/instructors', data);
        if (response == " Instructor details saved") {
          alert('Form submitted');
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error);
      }
    } else {
      alert('Form has errors.' + errors.name + errors.contactNo +  errors.email + name + contactNo + email);
    }
  };

  const styles = {
    container: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      width: '40vw',
    },
    label: {
      display: 'block',
      margin: '10px 0 5px',
    },
  };

  return (
    <div style={styles.container}>
      <Container className="d-flex justify-content-center align-items-center">
        <Form style={styles.form} onSubmit={handleSubmit}>
          <Row style={{ textAlign: 'center' }}>
            <h1>Add Instructor Details</h1>
          </Row>

          <br /><br /><br />

          <Row>
            <Col>
              <label><b>Profile :</b></label><br />
              <Image src={profileImage} thumbnail style={{ width: '100px', cursor: 'pointer' }} onClick={() => document.getElementById('fileInput').click()} />
              <Form.Control
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </Col>
            <Col>
              <Form.Group>
                <Form.Label><b>Email :</b></Form.Label>
                <Form.Control
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
              </Form.Group>
            </Col>        
          </Row>

          <br /><br />

          <Row>
            <Col>
              <Form.Group>
                <Form.Label><b>Name :</b></Form.Label>
                <Form.Control
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  style={{ width: '70%' }}
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label><b>Contact No :</b></Form.Label>
                <Form.Control
                  placeholder="Enter your number"
                  value={contactNo}
                  onChange={handleContactNoChange}
                />
                {errors.contactNo && <span style={{ color: 'red' }}>{errors.contactNo}</span>}
              </Form.Group>
            </Col>
          </Row>

          <br /><br />

          <Row>
            <Col>
              <Form.Group style={{ width: '70%' }}>
                <Form.Label><b>Role :</b></Form.Label>
                <Form.Select value={role} onChange={handleRoleChange}>
                  <option>Enter your role</option>
                  <option>Yoga Instructor</option>
                  <option>Music Instructor</option>
                  <option>Meditation Instructor</option>
                  <option>Doctor</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label><b>Short Description :</b></Form.Label>
                <Form.Control
                  as="textarea" rows={2}
                  placeholder="Enter a short decsription about yourself"
                  value={sdesc}
                  onChange={handlesdesc}
                />
                {errors.sdesc && <span style={{ color: 'red' }}>{errors.sdesc}</span>}
              </Form.Group>
            </Col>
          </Row><br /><br />
          <Row className="justify-content-center">
          <Col>
          <Form.Group>
                <Form.Label><b>More details :</b></Form.Label>
                <Form.Control as="textarea" rows={4} value={moreDetails} onChange={handleMoreDetailsChange} />
              </Form.Group>
            </Col> 
          </Row>
          <br /><br /><br />

          <Row className="justify-content-center">
            <Col className="d-flex justify-content-center">
              <Button type="submit" variant="success" style={{ width: '45%' }}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}