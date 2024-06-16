import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f4f7f6;
    color: #333;
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
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
  text-decoration: underline;
  color: #007BFF;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FormContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Select = styled.select`
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 15px;
  margin-top: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const AudioManagement = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [dayNumber, setDayNumber] = useState('');
  const [audioName, setAudioName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('Please select a valid audio file.');
      setAudioFile(null);
    }
  };

  const validateText = (text) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(text);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    if (validateText(value)) {
      setAudioName(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Name can only contain letters.');
    }
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (validateText(value)) {
      setDescription(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Description can only contain letters.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile || !dayNumber || !audioName || !description) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('dayNumber', dayNumber);
    formData.append('audioName', audioName);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      console.log(result);
      setErrorMessage('');
      setSuccessMessage('Audio file updated successfully.');
      setAudioFile(null);
      setDayNumber('');
      setAudioName('');
      setDescription('');
      document.getElementById('audioFile').value = '';
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to upload audio file.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!dayNumber) {
      setErrorMessage('Day number is required.');
      setSuccessMessage('');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this audio file?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dayNumber }),
      });

      const result = await response.text();
      console.log(result);
      setErrorMessage('');
      setSuccessMessage('Audio file deleted successfully.');
      setDayNumber('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to delete audio file.');
      setSuccessMessage('');
    }
  };

  return (
    <Card data-aos="fade-up">
      <FormContainer>
        <h2>Audio Management</h2>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="audioFile">Select Audio File:</Label>
          <Input type="file" id="audioFile" accept="audio/*" onChange={handleFileChange} />

          <Label htmlFor="audioName">Audio Name:</Label>
          <Input type="text" id="audioName" value={audioName} onChange={handleNameChange} />

          <Label htmlFor="description">Description:</Label>
          <Input type="text" id="description" value={description} onChange={handleDescriptionChange} />

          <Label htmlFor="dayNumber">Select Day Number:</Label>
          <Select id="dayNumber" value={dayNumber} onChange={(e) => setDayNumber(e.target.value)}>
            <option value="">Select Theme</option>
            <option value="Calm Mind">Calm Mind</option>
            <option value="Inside You">Inside You</option>
            <option value="Beauty of Mind">Beauty of Mind</option>
            <option value="Nature">Nature</option>
            <option value="Vibe of Night">Vibe of Night</option>
            <option value="Relax Your Mind">Relax Your Mind</option>
            <option value="Find You">Find You</option>
          </Select>

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          <Button type="submit">Update Database</Button>
          <Button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
            Delete Audio
          </Button>
        </Form>
      </FormContainer>
    </Card>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section>
          <Title data-aos="fade-up">Music Therapy</Title>
        </Section>

        <Card data-aos="fade-up">
          <center> Update Or Delete Audios</center>
          {/* Removed the AudioGrid and AudioButton components */}
        </Card>
        <AudioManagement />
      </Container>
    </>
  );
};

export default App;
