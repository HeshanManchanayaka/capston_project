import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';

const CardView = ({ instructor , index}) => {
    const navigate = useNavigate()
    const handleReadMore = () => {
        navigate(`/InstMoreDetails/${instructor.email}`);
    };

    return (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card >
            <Card.Img variant="top" src={instructor.profileImage} />
            <Card.Body>
              <Card.Title>{instructor.name}</Card.Title>
              <Card.Text>
                {instructor.sdesc}
                <br /><br />
                <button onClick={() => handleReadMore()} className="btn btn-primary">Read more ...</button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    );
};

export default CardView;