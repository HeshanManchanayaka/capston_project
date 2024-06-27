import React, { useState, useRef ,useEffect} from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import bgImage from '../assets/Photos/bg2.jpeg';
import Calendar from './Calender';
import Button from 'react-bootstrap/Button';
import profile from '../assets/Photos/profile.jpg';
import ProfileDisplay from './ProfileDisplay';
import axios from 'axios'; // Import axios for HTTP requests



export default function Edit() {
  const { email } = useParams();
  const navigate = useNavigate(); // Use the useNavigate hook
  const [instructor, setInstructor] = useState({});
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [profileImage, setProfileImage] = useState(profile);
  const [role, setRole] = useState('');
  const [moreDetails, setMoreDetails] = useState('');
  const [sdesc,setSdesc] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    contactNo: '',
  });
  const [loaded, setLoaded] = useState(false);

  const fileInputRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/instructor/${email}`)
          const instructor = response.data;
          setName(instructor.name);
          setContactNo(instructor.contactNo);
          setProfileImage(instructor.profileImage || profile);
          setRole(instructor.role);
          setMoreDetails(instructor.moreDetails);
          setSdesc(instructor.sdesc);
        } catch (error) {
          console.log('Error fetching instructor data', error);
          setLoaded(true);
        }
      };
      fetchData();
    }
  }, [email]);

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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!errors.email && !errors.name && !errors.contactNo) {
      const updatedInstructor = {
        email,
        name,
        contactNo,
        profileImage,
        role,
        moreDetails,
        sdesc
      };

      console.log('Updated Instructor:', updatedInstructor);

      try {
        const response = await axios.put(`http://localhost:5000/api/instructors/${email}`, updatedInstructor);
        console.log('API Response:', response);

        if (response.status === 200) {
          alert('Profile updated successfully');
          navigate(`/ProfileDisplay/${email}`);
        } else {
          console.error('Error updating profile', response);
        }
      } catch (error) {
        console.log('Error updating profile', error);
      }
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
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
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      padding: '20px',
      borderRadius: '10px',
      width: '50vw',
    },
    label: {
      display: 'block',
      margin: '10px 0 5px',
    },
    error: {
      color: 'red',
    },
  };

  return (loaded) ? (<div style={styles.notfound}> <h1> User Not Found!</h1></div>) : (
    <div>
      <div style={styles.container}>
        <Container className="d-flex justify-content-center align-items-center">
          <Form style={styles.form} onSubmit={handleFormSubmit}>
            <Row style={{ textAlign: 'center' }}>
              <h1>Edit Your Profile</h1>
            </Row>

            <br />

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label style={styles.label}><b>Profile Image   :</b></Form.Label>
                  <Form.Control type="file" ref={fileInputRef} onChange={handleProfileImageChange} />
                  <Image src={profileImage} thumbnail style={{ width: '100px' }} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label style={styles.label}><b>Email   :</b></Form.Label>
                  <Form.Control type="email" value={email} onChange={handleEmailChange} disabled />
                  {errors.email && <span style={styles.error}>{errors.email}</span>}
                </Form.Group>
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label style={styles.label}><b>Name    :</b></Form.Label>
                  <Form.Control type="text" value={name} onChange={handleNameChange} />
                  {errors.name && <span style={styles.error}>{errors.name}</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label style={styles.label}><b>Contact No    :</b></Form.Label>
                  <Form.Control type="text" value={contactNo} onChange={handleContactNoChange} />
                  {errors.contactNo && <span style={styles.error}>{errors.contactNo}</span>}
                </Form.Group>
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label style={styles.label}><b>Role    :</b></Form.Label>
                  <Form.Select disabled value={role} onChange={handleRoleChange}>
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
                  <Form.Label style={styles.label}><b>Short Description    :</b></Form.Label>
                  <Form.Control as="textarea" rows={2} value={sdesc} onChange={(e) => setSdesc(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col>
            <Form.Group>
                  <Form.Label style={styles.label}><b>More Details    :</b></Form.Label>
                  <Form.Control as="textarea" rows={4} value={moreDetails} onChange={(e) => setMoreDetails(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label><b>Edit your calendar :</b></Form.Label>
                  <Calendar />
                </Form.Group>
              </Col>
            </Row>

            <br /><br /><br />

            <Row className="justify-content-center">
              <Col className="d-flex justify-content-center align-items-center">
                <Button type="submit" onClick={() => handleFormSubmit()} variant="success" style={{ width: '35%' }}><a style={{textDecoration: 'none', color: 'white'}}>Save Changes</a></Button>
              </Col>
            </Row>
          </Form>
        </Container>
        {/*Button Acept changes*/} </div>
      {showProfile && (
        <ProfileDisplay 
          email={email} 
          name={name} 
          contactNo={contactNo} 
          profileImage={profileImage} 
        />
      )}
    </div>
  );
}