import React from 'react';
import '../styles/Admin.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

function AdminContent() {
  return (
    <div className='GridsBox'>
      <CssBaseline />
      <Box className="grid-item1"><h3>Volunteer Join Requests</h3></Box>
      <Box className="grid-item1"><h3>Add/Remove Inventory Requirements</h3></Box>
      <Box className="grid-item1"><h3>Volunteers Activity Progress</h3></Box>
      <Box className="grid-item2"><h3>Donations Received</h3></Box>
      <Box className="grid-item2"><h3>Volunteer Rankings</h3></Box>
    </div>
  )
}

export default AdminContent