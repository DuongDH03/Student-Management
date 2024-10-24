import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const StudentTable = ({ students, onEdit, fetchStudents }) => {
  const handleEdit = (student) => {
    onEdit(student);
    console.log('Edit student:', student);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.post('http://localhost:3001/api/delete', { StudentId: studentId });
      fetchStudents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Roll</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.StudentId}
              </TableCell>
              <TableCell>{student.Name}</TableCell>
              <TableCell>{student.Roll}</TableCell>
              <TableCell>{new Date(student.Birthday).toLocaleDateString()}</TableCell>
              <TableCell>{student.Address}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(student)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(student.StudentId)}>
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;