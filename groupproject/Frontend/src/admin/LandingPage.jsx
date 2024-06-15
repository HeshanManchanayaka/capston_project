
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';


const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
   
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Welcome to the Admin Dashboard
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
                  User 
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
                  Admin 
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
                  Instructor
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
