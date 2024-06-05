import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button:focus {
    outline: none;
  }
`;

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
  font-family: 'Georgia', serif; /* Change font */
  text-decoration: underline; /* Underline text */
`;

const Card = styled.div`
  background-color: #acf7ba;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: device-size;
  width: 100%;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const AudioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 3fr));
  gap: 100px;
  padding:50px;
 
`;

const AudioButton = styled.button`
  padding: 10px; /* Increase padding */
  font-size: 1em; /* Increase font size */
  height:80px;
  background-color: #84ea97;
  border: 3px solid;
  border-radius: 5px;
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
  margin-left:10px;
  margin-top:50px;

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
      margin-bottom: 20px;
      font-size: 1.1em;
    }
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  text-align: center;

  img {
    max-width: 90%;
    height: 400px;;
    border-radius: 10px;
  }
`;

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const handleAudioClick = (e) => {
    const buttons = document.querySelectorAll('.audio-button');
    buttons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section>
          <Title data-aos="fade-up">Music Therapy</Title>
        </Section>

        <Card data-aos="fade-up">
          <AudioGrid>
            {[...Array(12)].map((_, i) => (
              <AudioButton 
                key={i} 
                className="audio-button" 
                onClick={handleAudioClick} 
                data-aos="zoom-in"
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Audio {i + 1}
                
              </AudioButton>
            ))}
          </AudioGrid>
        </Card>

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
