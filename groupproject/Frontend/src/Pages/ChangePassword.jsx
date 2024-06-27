import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import bgImage from '../assets/Photos/bg2.jpeg';

function ChangePassword() {
    const styles = {
        container: {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            padding: '20px',
            display: 'grid',
            gap: '10px',
            alignItems: 'center',
        },
        form: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            width: '50vw',
        },
        label: {
            display: 'block',
            margin: '10px 0 5px',
        },
        button: {
            width: '100%', // Make button take full width of the column
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
    };

    return (
        <div style={styles.container}>
            <Container className="d-flex justify-content-center align-items-center">
                <Form style={styles.form} onSubmit={handleFormSubmit}>
                    <Row style={{ textAlign: 'center' }}>
                        <h1>Change Password</h1>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Group controlId="formOldPassword">
                                <Form.Label style={styles.label}>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter old password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label style={styles.label}>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label style={styles.label}>Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm new password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-center">
                        <Col md={6} className="d-flex justify-content-center">
                            <Button type="submit" variant="success" style={styles.button} className="mt-3">
                                Save Changes
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default ChangePassword;
