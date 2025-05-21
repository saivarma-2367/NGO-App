import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../styles/DashboardGrids.css';

function DashboardGrids() {
  return (
    <div className='GridsBox'>
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '80vh' }} >
          <h3>Donations Received</h3>
        </Box>
      </Container>
    </React.Fragment>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '80vh' }} >
          <h3>Volunteer Contributions</h3>
        </Box>
      </Container>
    </React.Fragment>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '80vh' }} >
          <h3>Donations Required</h3>
        </Box>
      </Container>
    </React.Fragment>
    </div>
  )
}

export default DashboardGrids