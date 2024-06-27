import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Corrected: Import useNavigate instead of useHistory
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import bgImage from '../assets/Photos/bg2.jpeg';
import Calendar from './Calender';
import profile from '../assets/Photos/profile.jpg';
import editImg from '../assets/Photos/edit.png';
import deleteImg from '../assets/Photos/delete.png';
import logOutImg from '../assets/Photos/logout.png';

export default function ProfileDisplay() {
  const [loaded, setLoaded] = useState(false);
  const {email} = useParams();
  const [instructor, setInstructor] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/instructor/${email}`);
        if (response.ok) {
          const data = await response.json();
          setInstructor(data);
        } else {
          console.error('Error fetching data');
          setLoaded(true); 
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [email]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this instructor?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/instructors/${email}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Instructor details deleted');
        navigate('/instructorhome');
      } else {
        console.error('Error deleting data');
        alert('Error deleting data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting data');
    }
  };


  
  const styles = {
    container: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      padding: '20px',
      display: 'grid',
      gap: '10px',
      alignItems: 'center',
      
    },
    notfound: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      width: '45vw',  
    },
    label: {
      display: 'block',
      margin: '10px 0 5px',
      wordWrap: 'break-word'  // Ensure long text breaks correctly
    },
    formLabel: {
      paddingLeft: '30px',
      wordWrap: 'break-word'  // Ensure long text breaks correctly
    },
  };

  

  return (loaded) ? (<div style={styles.notfound}> <h1> User Not Found!</h1></div>) : (
    <div style={styles.container}>
      <Container className="d-flex justify-content-center align-items-center">
        <Form style={styles.form}>
          <Row style={{ textAlign: 'center' }}>
            <h1>Your Profile</h1>
          </Row>

          <br />

          <Row>
            <Col></Col>
            <Col className="d-flex justify-content-end align-items-start">
            <div className="d-flex flex-column align-items-end">
                <Row>
                  <Col>  
                  <Link to={`/editprofile/${email}`}> <Image src={editImg} style={{ width: '25px' }} roundedCircle className="mb-2" /></Link> 
                  </Col>
                  <Col>
                    <Image src={logOutImg} style={{ width: '22px' }} roundedCircle />
                  </Col>
                  <Col>
                    <Image src={deleteImg} style={{ width: '22px' }} roundedCircle onClick={handleDelete} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <label><b>Profile Image  :</b></label><br />
              <Image 
                src={instructor.profileImage || profile}  
                thumbnail 
                style={{ width: '100px'}} 
              />
            </Col>

            <Col>
                  <Form.Group>
                  <Form.Label><b>Email :</b></Form.Label><br/>
                  <Form.Label style={{ paddingLeft: '30px' }}>{instructor.email}</Form.Label>
                  </Form.Group>
                </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Form.Group>
                <Form.Label><b>Name :</b></Form.Label><br/>
                <Form.Label style={{ paddingLeft: '30px' }}>{instructor.name}</Form.Label>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                    <Form.Label><b>Contact No :</b></Form.Label><br/>
                    <Form.Label style={{ paddingLeft: '30px' }}>{instructor.contactNo}</Form.Label>
                  </Form.Group>
            </Col>
          </Row>

          <br /><br />

          <Row>
            <Col>
              <Row>
                <Form.Group >
                  <Form.Label><b>Role :</b></Form.Label><br/>
                  <Form.Label style={{ paddingLeft: '30px' }}>{instructor.role}</Form.Label>
                </Form.Group>
              </Row>

              <br /><br />

            </Col>

            <Col>
            <Form.Group>
                <Form.Label><b>Short Description :</b></Form.Label><br/>
                <Form.Label style={{ paddingLeft: '30px' }}>{instructor.sdesc}</Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
          <Col>
          <Form.Group>
                <Form.Label><b>More details :</b></Form.Label><br/>
                <Form.Label style={{ paddingLeft: '30px' }}>{instructor.moreDetails}</Form.Label>
              </Form.Group>
            </Col> 
          </Row>

          <Row>
          <Form.Group>
                <Form.Label><b>Your calendar :</b></Form.Label>
                <Calendar />
              </Form.Group>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
