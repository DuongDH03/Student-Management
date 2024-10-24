import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const StudentForm = ({ student, onSubmit }) => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState(null);

  useEffect(() => {
    if (student) {
      setStudentId(student.StudentId);
      setName(student.Name);
      setRoll(student.Roll);
      setAddress(student.Address);
      setBirthday(student.Birthday);
    }
  }, [student]);

  const handleSubmit = async () => {
    try {
      const url  = student ? 'http://localhost:3001/api/update' : 'http://localhost:3001/api/save';
      await axios.post(url, {
        StudentId: studentId,
        Name: name,
        Roll: roll,
        Address: address,
        Birthday: birthday
      });
      // Clear the form after submission
      setStudentId('');
      setName('');
      setRoll('');
      setAddress('');
      setBirthday(null);

      onSubmit(student ? 'Student updated successfully!' : 'Student created successfully!');
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <FormControl>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="student-id"
          placeholder="Enter the student's Id here"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="name"
          placeholder="Enter the student's name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="roll"
          placeholder="Enter roll number here"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="address"
          placeholder="Enter the address here"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Enter D.O.B"
            value={birthday}
            onChange={(newValue) => setBirthday(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        {student ? 'Update' : 'Create'}
      </Button>
    </FormControl>
  );
};

export default StudentForm;