import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #a4dfa793;
  padding: 200px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 100px;
`;

const Header = styled.h1`
  font-size: 3em;
  color: #4CAF50;
  margin-bottom: 50px;
`;

const CardsSection = styled(Section)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 300px;
  height: 500px;
  background: rgba(80, 223, 113, 0.93);
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
    height: 300px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;

    h3 {
      margin-bottom: 10px;
    }
  }
`;

const BenefitsSectionContainer = styled(Section)`
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const BenefitItem = styled.div`
  display: inline-block;
  width: 200px;
  margin: 30px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(80, 223, 113, 0.93);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PersonCard = ({ image, name, contact, about }) => (
  <Card data-aos="zoom-in">
    <img src={image} alt={name} />
    <div className="card-content">
      <h3>{name}</h3>
      <p>Contact Details: {contact}</p>
      <p>About: {about}</p>
    </div>
  </Card>
);

const BenefitsSection = () => (
  <BenefitsSectionContainer>
    <h2>Benefits Of Meditation</h2>
    <BenefitItem data-aos="fade-up">Personal empowerment</BenefitItem>
    <BenefitItem data-aos="fade-up">Hope</BenefitItem>
    <BenefitItem data-aos="fade-up">The overcoming of demoralization caused by social stigma</BenefitItem>
    <BenefitItem data-aos="fade-up">Acceptance of life</BenefitItem>
    <BenefitItem data-aos="fade-up">Personal insight</BenefitItem>
    <BenefitItem data-aos="fade-up">Life skills</BenefitItem>
    <BenefitItem data-aos="fade-up">Wellness</BenefitItem>
    <BenefitItem data-aos="fade-up">Prevention of future mental health distress</BenefitItem>
  </BenefitsSectionContainer>
);






function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <AppContainer>
      <Header>COUNCELING</Header>
      <CardsSection>
        <PersonCard
          image="../src/assets/person.png"
          name="Ven. Thiththagalle Anandasiri Thero"
          contact="0775825456"
          about="Best Meditation Methods"
        />
        <PersonCard
          image="../src/assets/person.png"
          name="Dr. Anjana Fernando"
          contact="0771024902"
          about="Keep your mindfulness"
        />
        <PersonCard
          image="../src/assets/person.png"
          name="Dr. Ashan Kalhara"
          contact="0762794256"
          about="Any language, any kind of meditation types"
        />
        <PersonCard
          image="../src/assets/person.png"
          name="Mr. Tharindu Dilshan"
          contact="0757231998"
          about="Great experience with various mindfulness types"
        />
      </CardsSection>

      <BenefitsSection />
    </AppContainer>
  );
}

export default App;
