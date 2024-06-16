import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormSection = styled.div`
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px;
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

const DeleteButton = styled(Button)`
  background-color: #ff0000;

  &:hover {
    background-color: #cc0000;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const VideoManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    reset: resetDelete,
    formState: { errors: deleteErrors }
  } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('videoFile', data.videoFile[0]);
    formData.append('videoName', data.videoName);
    formData.append('day', data.day);
    formData.append('description', data.description);
    formData.append('author', data.author);

    console.log('FormData entries:', [...formData.entries()]);

    try {
      const response = await fetch('http://localhost:5000/upload-video', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      setSuccessMessage('Video uploaded successfully.');
      setErrorMessage('');
      reset();
    } catch (error) {
      setErrorMessage(`Failed to upload video: ${error.message}`);
      setSuccessMessage('');
    }
  };

  const onDelete = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/delete-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      setDeleteSuccessMessage('Video deleted successfully.');
      setDeleteErrorMessage('');
      resetDelete();
    } catch (error) {
      setDeleteErrorMessage(`Failed to delete video: ${error.message}`);
      setDeleteSuccessMessage('');
    }
  };

  const validateFileType = (file) => {
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    return file && validTypes.includes(file[0].type) ? true : 'Please select a valid video file.';
  };

  const validateText = (value) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value) || 'This field can only contain letters.';
  };

  return (
    <Container>
      <h1>Video Management</h1>

      <FormSection>
        <h2>Upload Video</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="videoName">Video Name:</Label>
          <Input
            type="text"
            id="videoName"
            {...register('videoName', {
              required: 'Video name is required.',
              validate: validateText
            })}
          />
          {errors.videoName && <ErrorMessage>{errors.videoName.message}</ErrorMessage>}

          <Label htmlFor="videoFile">Select Video File:</Label>
          <Input
            type="file"
            id="videoFile"
            accept="video/mp4,video/webm,video/ogg"
            {...register('videoFile', {
              required: 'Video file is required.',
              validate: validateFileType
            })}
          />
          {errors.videoFile && <ErrorMessage>{errors.videoFile.message}</ErrorMessage>}

          <Label htmlFor="day">Select Day:</Label>
          <Select id="day" {...register('day', { required: 'Day is required.' })}>
            <option value="">Select Day</option>
            <option value="Day 1">Day 1</option>
            <option value="Day 2">Day 2</option>
            <option value="Day 3">Day 3</option>
            <option value="Day 4">Day 4</option>
            <option value="Day 5">Day 5</option>
            <option value="Day 6">Day 6</option>
            <option value="Day 7">Day 7</option>
          </Select>
          {errors.day && <ErrorMessage>{errors.day.message}</ErrorMessage>}

          <Label htmlFor="description">Description:</Label>
          <Input
            type="text"
            id="description"
            {...register('description', {
              required: 'Description is required.',
              validate: validateText
            })}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

          <Label htmlFor="author">Author:</Label>
          <Input
            type="text"
            id="author"
            {...register('author', {
              required: 'Author name is required.',
              validate: validateText
            })}
          />
          {errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          <Button type="submit">Upload Video</Button>
        </Form>
      </FormSection>

      <FormSection>
        <h2>Delete Video</h2>
        <Form onSubmit={handleSubmitDelete(onDelete)}>
          <Label htmlFor="deleteVideoName">Video Name:</Label>
          <Input
            type="text"
            id="deleteVideoName"
            {...registerDelete('videoName', {
              required: 'Video name is required.',
              validate: validateText
            })}
          />
          {deleteErrors.videoName && <ErrorMessage>{deleteErrors.videoName.message}</ErrorMessage>}

          <Label htmlFor="deleteDay">Select Day:</Label>
          <Select id="deleteDay" {...registerDelete('day', { required: 'Day is required.' })}>
            <option value="">Select Day</option>
            <option value="Day 1">Day 1</option>
            <option value="Day 2">Day 2</option>
            <option value="Day 3">Day 3</option>
            <option value="Day 4">Day 4</option>
            <option value="Day 5">Day 5</option>
            <option value="Day 6">Day 6</option>
            <option value="Day 7">Day 7</option>
          </Select>
          {deleteErrors.day && <ErrorMessage>{deleteErrors.day.message}</ErrorMessage>}

          {deleteErrorMessage && <ErrorMessage>{deleteErrorMessage}</ErrorMessage>}
          {deleteSuccessMessage && <SuccessMessage>{deleteSuccessMessage}</SuccessMessage>}

          <DeleteButton type="submit">Delete Video</DeleteButton>
        </Form>
      </FormSection>
    </Container>
  );
};

export default VideoManagement;
