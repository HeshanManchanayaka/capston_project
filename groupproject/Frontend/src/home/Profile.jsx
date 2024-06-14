import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import styled from 'styled-components';
import NavBar from './Navbar';

const ProfileContainer = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
  position: relative;
`;

const Table = styled.table`
  border: 1px solid #ddd;
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
    text-align: center;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 2px 0;
  box-sizing: border-box;
`;

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #b30000;
  }
`;

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const myemail = localStorage.getItem('email');

        const response = await axios.get(`http://localhost:5000/api/profile/${myemail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setValidationError('Name should only contain letters and spaces.');
      setAlertOpen(true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setValidationError('Invalid email format.');
      setAlertOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const myemail = localStorage.getItem('email');
      await axios.put(
        `http://localhost:5000/api/profile/${myemail}`,
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlertOpen(true);
      setValidationError('Profile updated successfully'); // Set the success message
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const myemail = localStorage.getItem('email');
      await axios.delete(`http://localhost:5000/api/profile/${myemail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <ProfileContainer>
      <NavBar />
      <h1>Welcome <br /><br /> My Profile</h1>
      <Table>
        <TableHead>
          <TableRow>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <ActionButton onClick={handleUpdate}>Update</ActionButton>
              <ActionButton onClick={handleDelete}>Delete</ActionButton>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
      <br />
      <br />

      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>

      {/* Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={validationError === 'Profile updated successfully' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {validationError}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  );
};

export default Profile;
