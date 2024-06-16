import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactAudioPlayer from 'react-audio-player';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background-image: url('../src/assets/musicbc.jpeg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
  button:focus {
    outline: none;
  }
`;

// Styled components
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
  text-decoration: underline;
`;

const Card = styled.div`
  background-color: rgba(152, 251, 152, 0.5); // Adjusted for transparency
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const InstructionText = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;

const AudioGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const AudioButton = styled.button`
  padding: 10px;
  width: 100%;
  font-size: 1em;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgba(226, 223, 210, 0.7);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &.active {
    background-color: #4caf50;
    color: white;
  }
`;

const BenefitsSection = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const BenefitsColumn = styled.div`
  flex: 1;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
  }

  h2 {
    font-size: 2em;
    margin-bottom: 20px;
    text-decoration: underline;
    font-family: 'Georgia', serif;
  }

  ul {
    list-style: disc;
    padding-left: 30px;

    li {
      margin-bottom: 10px;
      font-size: 1.1em;
    }
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const AudioDetails = styled.div`
  margin-top: 10px;
  font-size: 0.9em;
`;

const App = () => {
  const [audios, setAudios] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentAudioDetails, setCurrentAudioDetails] = useState(null);

  useEffect(() => {
    AOS.init();

    const fetchAudios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/audios');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAudios(data);
      } catch (error) {
        console.error('Error fetching audio data:', error);
      }
    };

    fetchAudios();
  }, []);

  const handleAudioClick = (audio) => {
    setCurrentAudio(audio.url);
    setCurrentAudioDetails(audio);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section>
          <Title data-aos="fade-up">Music Therapy</Title>
        </Section>

        <Card data-aos="fade-up">
          <InstructionText>Click and listen to your music</InstructionText>
          <AudioGrid>
            {audios.map((audio, i) => (
              <AudioButton
                key={i}
                className={currentAudioDetails && currentAudioDetails.day === audio.day ? 'active' : ''}
                onClick={() => handleAudioClick(audio)}
                data-aos="zoom-in"
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                {audio.day}
                {currentAudioDetails && currentAudioDetails.day === audio.day && (
                  <AudioDetails>
                    <div><strong>Name:</strong> {audio.name}</div>
                    <div><strong>Description:</strong> {audio.description}</div>
                  </AudioDetails>
                )}
              </AudioButton>
            ))}
          </AudioGrid>
        </Card>

        {currentAudio && (
          <ReactAudioPlayer
            src={currentAudio}
            autoPlay
            controls
            style={{ width: '100%', maxWidth: '800px', margin: '20px 0' }}
          />
        )}

        <Card data-aos="fade-up">
          <BenefitsSection>
            <BenefitsColumn>
              <h2>Benefits of Music Therapy</h2>
              <ul>
                <li>Reduces anxiety and physical effects of stress</li>
                <li>Improves healing</li>
                <li>Helps manage Parkinson’s and Alzheimer’s disease</li>
                <li>Reduces depression and other symptoms in the elderly</li>
                <li>Reduces symptoms of psychological disorders including schizophrenia</li>
                <li>Improves self-expression and communication</li>
              </ul>
            </BenefitsColumn>
            <ImageColumn>
              <img src="../src/assets/OIP.jpg" alt="Music Therapy" />
            </ImageColumn>
          </BenefitsSection>
        </Card>
      </Container>
    </>
  );
};

export default App;
