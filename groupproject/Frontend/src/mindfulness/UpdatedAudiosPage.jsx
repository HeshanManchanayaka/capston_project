import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  // (Your container styles)
`;

const Title = styled.h1`
  // (Your title styles)
`;

const AudioGrid = styled.div`
  // (Your audio grid styles)
`;

const AudioButton = styled.button`
  // (Your audio button styles)
`;

const UpdatedAudiosPage = () => {
  const [audios, setAudios] = useState([]);

  const fetchAudios = async () => {
    try {
      const response = await fetch('http://localhost:5000/audios');
      const data = await response.json();
      setAudios(data);
    } catch (error) {
      console.error('Error fetching audios:', error);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <Container>
      <Title>Updated Audio List</Title>
      <AudioGrid>
        {audios.map((audio, i) => (
          <AudioButton key={i}>
            {audio.day}
          </AudioButton>
        ))}
      </AudioGrid>
      <Link to="/">Back to Home</Link>
    </Container>
  );
};

export default UpdatedAudiosPage;
