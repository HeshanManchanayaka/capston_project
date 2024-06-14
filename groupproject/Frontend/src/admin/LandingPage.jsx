
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="../../public/people_8365036.png" alt="User" />
            <Card.Body>
              <Card.Title>User</Card.Title>
              <Card.Text>
               Manage users
              </Card.Text>
              <Button variant="primary" onClick={() => handleNavigate('/admin/AdminPanel')}>
                User Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="../../public/download.png" alt="Admin" />
            <Card.Body>
              <Card.Title>Admin</Card.Title>
              <Card.Text>
                Login as an admin to manage users, view analytics, and access administrative features.
              </Card.Text>
              <Button variant="primary" onClick={() => handleNavigate('/admin/admin')}>
                Admin Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="../../public/yoga.png" alt="Instructor" />
            <Card.Body>
              <Card.Title>Instructor</Card.Title>
              <Card.Text>
                Add instructors here
              </Card.Text>
              <Button variant="primary" onClick={() => handleNavigate('/instructor/instructor')}>
                Instructor Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
