import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

const PlansPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dayId, setDayId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch video data from the backend (replace with your API endpoint)
  const fetchVideoData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get('/api/videos'); // Adjust URL based on your backend
      setVideos(response.data);
    } catch (error) {
      setErrorMessage('Error fetching video data');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle video form submission (add or update)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { dayId: newDayId, ...formData } = selectedVideo || {}; // Destructuring for add/update

    try {
      setIsLoading(true);
      setErrorMessage('');
      if (selectedVideo) {
        // Update existing video
        await axios.put(`/api/videos/${selectedVideo.id}`, formData); // Adjust URL
      } else {
        // Add new video
        await axios.post('/api/videos', { ...formData, dayId: newDayId }); // Adjust URL
      }
      setSelectedVideo(null);
      fetchVideoData(); // Refetch data after add/update
    } catch (error) {
      setErrorMessage('Error adding/updating video');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle video deletion
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await axios.delete(`/api/videos/${id}`); // Adjust URL
      fetchVideoData(); // Refetch data after deletion
    } catch (error) {
      setErrorMessage('Error deleting video');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle selecting a video for editing
  const handleEdit = (video) => {
    setSelectedVideo(video);
  };

  // Function to clear any error message
  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    fetchVideoData();
  }, []); // Fetch data on component mount

  return (
    <div className="plans-page">
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Form for adding or updating video */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dayId">Day ID:</label>
          <input
            type="number"
            id="dayId"
            name="dayId"
            value={dayId || selectedVideo?.dayId || ''}
            onChange={(e) => setDayId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {selectedVideo ? 'Update' : 'Add Video'}
        </button>
      </form>

      {/* List of video entries */}
      <table>
        <thead>
          <tr>
            <th>Day ID</th>
            <th>Video Link</th> {/* Assuming you store a URL to the video */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.dayId}</td>
              <td>{video.videoUrl}</td> {/* Assuming you have a videoUrl field */}
              <td>
                <button onClick={() => handleEdit(video)}>Edit</button>
                <button onClick={() => handleDelete(video.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlansPage;

// CSS (add to your stylesheet)
.plans-page {
  display: flex;
  flex-direction: column;
  align-items:
