import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AudioManagement = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [dayNumber, setDayNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('Please select a valid audio file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile || !dayNumber) {
      setErrorMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('dayNumber', dayNumber);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      console.log(result);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to upload audio file.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!audioFile || !dayNumber) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: audioFile.name, dayNumber }),
      });

      const result = await response.text();
      console.log(result);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to delete audio file.');
    }
  };

  return (
    <Container>
      <h2>Audio Management</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="audioFile">Select Audio File:</Label>
        <Input type="file" id="audioFile" accept="audio/*" onChange={handleFileChange} />

        <Label htmlFor="dayNumber">Select Day Number:</Label>
        <Select id="dayNumber" value={dayNumber} onChange={(e) => setDayNumber(e.target.value)}>
          <option value="">Select Day</option>
          <option value="day1">Day 1</option>
          <option value="day2">Day 2</option>
          <option value="day3">Day 3</option>
          <option value="day4">Day 4</option>
          <option value="day5">Day 5</option>
          <option value="day6">Day 6</option>
          <option value="day7">Day 7</option>
        </Select>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Button type="submit">Update Database</Button>
        <Button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
          Delete Audio
        </Button>
      </Form>
    </Container>
  );
};

export default AudioManagement;
