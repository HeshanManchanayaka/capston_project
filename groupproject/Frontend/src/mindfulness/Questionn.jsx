import React, { useEffect, useState } from 'react';
import AOS from 'aos';              
import 'aos/dist/aos.css';
import styled from 'styled-components';
import ZenFitLife from './Plan';
import { useNavigate } from 'react-router-dom';

const MentalHealth = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const nav = useNavigate()

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    nav('/plan')

    const form = e.target;
    const formData = new FormData(form);
    if (
      formData.get('q1') &&
      formData.get('q2') &&
      formData.get('q3') &&
      formData.get('q4')
    ) {
      setFormSubmitted(true);
      setFormError(false);

    } else {
      setFormError(true);
    }
  };

  return (
    <Container>
      <Title>Mindfulness</Title>
      <MainSection>
        <Content data-aos="fade-up">
          <p><b>Answer the simple Questions...</b></p>
          <QuestionsSection>
            <form onSubmit={handleSubmit}>
              <Question data-aos="fade-right">
                <label htmlFor="q1">Question 1: Do You Like Freedom?</label>
                <Buttons>
                  <input type="radio" id="q1-yes" name="q1" value="yes" required />
                  <label htmlFor="q1-yes">Yes</label>
                  <input type="radio" id="q1-no" name="q1" value="no" required />
                  <label htmlFor="q1-no">No</label>
                </Buttons>
                
              </Question>
              <Question data-aos="fade-right">
                <label htmlFor="q2">Question 1: Do You Like Freedom?</label>
                <Buttons>
                  <input type="radio" id="q2-yes" name="q2" value="yes" required />
                  <label htmlFor="q2-yes">Yes</label>
                  <input type="radio" id="q2-no" name="q2" value="no" required />
                  <label htmlFor="q2-no">No</label>
                </Buttons>
                
              </Question>
              <Question data-aos="fade-right">
                <label htmlFor="q3">Question 1: Do You Like Freedom?</label>
                <Buttons>
                  <input type="radio" id="q3-yes" name="q3" value="yes" required />
                  <label htmlFor="q3-yes">Yes</label>
                  <input type="radio" id="q3-no" name="q3" value="no" required />
                  <label htmlFor="q3-no">No</label>
                </Buttons>
                
              </Question>
              <Question data-aos="fade-right">
                <label htmlFor="q4">Question 1: Do You Like Freedom?</label>
                <Buttons>
                  <input type="radio" id="q4-yes" name="q4" value="yes" required />
                  <label htmlFor="q4-yes">Yes</label>
                  <input type="radio" id="q4-no" name="q4" value="no" required />
                  <label htmlFor="q4-no">No</label>
                </Buttons>
              </Question>
              {/* Questions 2-4 code */}
              
              {formError && <ErrorMessage>Please answer all questions</ErrorMessage>}
              <SubmitButton type="submit" data-aos="zoom-in" onClick={handleSubmit}> Submit</SubmitButton>
              {formSubmitted && <p>Thank you for submitting!</p>}
            </form>
          </QuestionsSection>
        </Content>
      </MainSection>
      <BenefitsSection>
        <BenefitsHeader>
          <h2>Benefits of Mindfulness</h2>
        </BenefitsHeader>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <BenefitItem className="p-3">
              <img src="../src/assets/calm mind.jpg" alt="Calmer and sharper mind" className="img-fluid rounded mb-2" />
              <p className="text-center font-weight-bold">Calmer and sharper mind</p>
            </BenefitItem>
            <BenefitItem className="p-3">
              <img src="../src/assets/R.jpg" alt="Better Sleep" className="img-fluid rounded mb-2" />
              <p className="text-center font-weight-bold">Better Sleep</p>
            </BenefitItem>
          </div>
          <div className="col-md-4 mb-4">
            <BenefitItem className="p-3">
              <img src="../src/assets/kinder.jpg" alt="Happier and Kinder you" className="img-fluid rounded mb-2" />
              <p className="text-center font-weight-bold">Happier and Kinder you</p>
            </BenefitItem>
            <BenefitItem className="p-3">
              <img src="../src/assets/work.jpg" alt="Increased productivity at work" className="img-fluid rounded mb-2" />
              <p className="text-center font-weight-bold">Increased productivity at work</p>
            </BenefitItem>
          </div>
          <div className="col-md-4 mb-4">
            <BenefitItem className="p-3">
              <img src="../src/assets/stress.jpg" alt="Stress Free Life" className="img-fluid rounded mb-2" />
              <p className="text-center font-weight-bold">Stress Free Life</p>
            </BenefitItem>
            <BenefitItem className="p-3">
              <img src="../src/assets/better.jpg" alt="Better at Relationship" className="img-fluid rounded mb-2" />
              <p className="text-center font-weight-bold">Better at Relationship</p>
            </BenefitItem>
          </div>
        </div>
      </BenefitsSection>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-family: Georgia, serif;
  font-size: 32px;
  margin-bottom: 20px;
`;

const MainSection = styled.section`
  background-image: url('../src/assets/bc.jpg');
  background-size: cover;
  background-position: center;
  padding: 50px 20px;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: rgba(231, 245, 235, 0.8);
  padding: 50px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  border-color: #000000c5;
  border-style: inset;
  margin-left: auto;
`;

const QuestionsSection = styled.div`
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  background-color: #a4dfa793;
`;

const Question = styled.div`
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 200px;

  input[type="radio"] {
    display: none;
  }

  label {
    background-color: #acf7ba;
    border: 1px solid #070e06;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      background-color: #4CAF50;
      color: white;
      border-color: #4CAF50;
    }
  }

  input[type="radio"]:checked + label {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #72ab75c5;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const BenefitsSection = styled.section`
  background-color: #86e48e9d;
  padding: 30px;
  border-radius: 10px;
  max-width: 100%;
  margin: auto;
  text-align: center;
`;

const BenefitsHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-family: 'Georgia, serif';
    font-size: 28px;
    color: #051b09;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
`;

const BenefitItem = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    border-radius: 10px;
  }

  p {
    margin-top: 10px;
    font-family: monospace;
    font-weight: bold;
  }
`;

export default MentalHealth;
