import React, { useState, useEffect } from 'react';
import './App.css';
import StudentTable from './StudentTable';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import StudentForm from './StudentForm';
import Box from '@mui/material/Box';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/findall');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentStudent(null);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setOpen(true);
  };

  const handleFormSubmit = (message) => {
    fetchStudents();
    handleClose();
    toast.success(message);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management System</h1>
      </header>
      <h2>Student List:</h2>
      <div className='table-container'>
        <StudentTable students={students} onEdit={handleEdit} fetchStudents={fetchStudents}/>
      </div>
      <div className='create-container'>
        <Button variant="contained" onClick={handleOpen}>Add new student +</Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <StudentForm student={currentStudent} onSubmit={handleFormSubmit}/>
          <Button variant="contained" onClick={handleClose} color="error">X</Button>
        </Box>
      </Modal>
      <ToastContainer />
      <hr />
      <div className='About'>
        <h2>About</h2>
        <p>We all cool mate!</p>
      </div>
    </div>
  );
}

export default App;