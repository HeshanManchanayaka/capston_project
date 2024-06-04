import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

const AudioPage = () => {
  const [audios, setAudios] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [dayId, setDayId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch audio data from the backend (replace with your API endpoint)
  const fetchAudioData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get('/api/audios'); // Adjust URL based on your backend
      setAudios(response.data);
    } catch (error) {
      setErrorMessage('Error fetching audio data');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle audio form submission (add or update)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { dayId: newDayId, ...formData } = selectedAudio || {}; // Destructuring for add/update

    try {
      setIsLoading(true);
      setErrorMessage('');
      if (selectedAudio) {
        // Update existing audio
        await axios.put(`/api/audios/${selectedAudio.id}`, formData); // Adjust URL
      } else {
        // Add new audio
        await axios.post('/api/audios', { ...formData, dayId: newDayId }); // Adjust URL
      }
      setSelectedAudio(null);
      fetchAudioData(); // Refetch data after add/update
    } catch (error) {
      setErrorMessage('Error adding/updating audio');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle audio deletion
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await axios.delete(`/api/audios/${id}`); // Adjust URL
      fetchAudioData(); // Refetch data after deletion
    } catch (error) {
      setErrorMessage('Error deleting audio');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle selecting an audio for editing
  const handleEdit = (audio) => {
    setSelectedAudio(audio);
  };

  // Function to clear any error message
  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    fetchAudioData();
  }, []); // Fetch data on component mount

  return (
    <div className="audio-page">
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Form for adding or updating audio */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dayId">Day ID:</label>
          <input
            type="number"
            id="dayId"
            name="dayId"
            value={dayId || selectedAudio?.dayId || ''}
            onChange={(e) => setDayId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {selectedAudio ? 'Update' : 'Add Audio'}
        </button>
      </form>

      {/* List of audio entries */}
      <table>
        <thead>
          <tr>
            <th>Day ID</th>
            {/* Add a column for audio details (filename, etc.) if applicable */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {audios.map((audio) => (
            <tr key={audio.id}>
              <td>{audio.dayId}</td>
              {/* Display audio details here if applicable */}
              <td>
                <button onClick={() => handleEdit(audio)}>Edit</button>
                <button onClick={() => handleDelete(audio.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioPage;

// CSS (add to your stylesheet)
.audio-page {
  display: flex;
  flex-direction: column;
  align-items: center;
