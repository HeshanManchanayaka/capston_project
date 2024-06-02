import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const BenefitsSection = styled(Section)`
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const BenefitItem = styled.div`
  display: inline-block;
  width: 200px;
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardsSection = styled(Section)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 201px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;

    h3 {
      margin-bottom: 10px;
    }
  }
`;

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <AppContainer>
      <BenefitsSection>
        <h2>Benefits Of Meditation</h2>
        <BenefitItem data-aos="fade-up">Reduces stress and anxiety</BenefitItem>
        <BenefitItem data-aos="fade-up">Strengthens the immune system</BenefitItem>
        <BenefitItem data-aos="fade-up">Improved sleep quality</BenefitItem>
        <BenefitItem data-aos="fade-up">Improves focus and concentration</BenefitItem>
        <BenefitItem data-aos="fade-up">Enhances problem solving abilities</BenefitItem>
        <BenefitItem data-aos="fade-up">Improves quality of life</BenefitItem>
        <BenefitItem data-aos="fade-up">Improves heart health</BenefitItem>
      </BenefitsSection>

      <CardsSection>
        <Card data-aos="zoom-in">
          <img src="https://via.placeholder.com/200x150" alt="Person" />
          <div className="card-content">
            <h3>Name</h3>
            <p>Contact Details:</p>
            <p>About:</p>
          </div>
        </Card>
        <Card data-aos="zoom-in">
          <img src="https://via.placeholder.com/200x150" alt="Person" />
          <div className="card-content">
            <h3>Name</h3>
            <p>Contact Details:</p>
            <p>About:</p>
          </div>
        </Card>
        <Card data-aos="zoom-in">
          <img src="https://via.placeholder.com/200x150" alt="Person" />
          <div className="card-content">
            <h3>Name</h3>
            <p>Contact Details:</p>
            <p>About:</p>
          </div>
        </Card>
        <Card data-aos="zoom-in">
          <img src="https://via.placeholder.com/200x150" alt="Person" />
          <div className="card-content">
            <h3>Name</h3>
            <p>Contact Details:</p>
            <p>About:</p>
          </div>
        </Card>
      </CardsSection>
    </AppContainer>
  );
}

export default App;
