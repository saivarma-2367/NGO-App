import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function DashboardGrids() {
  const [donations, setDonations] = useState([]);
  const [activities, setActivities] = useState([]);

  const fetchDonations = () => {
    fetch('http://localhost:5000/donations')
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.log("error occurred fetching donations.", err));
  };

  const fetchActivities = () => {
    fetch('http://localhost:5000/activities')
      .then((res) => res.json())
      .then((data) => {
        const completeTasks = data.filter((activity) => activity.Status === 'completed');
        setActivities(completeTasks);
      })
      .catch((err) => console.log("error occurred fetching activities", err));
  };

  useEffect(() => {
    fetchDonations();
    fetchActivities();
  }, []);

  return (
    <div className='GridsBox' style={{ textAlign: 'center' }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '80vh', padding: 2 }}>
          <h3>Donations Required</h3>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // center children horizontally
              overflowY: 'auto',
              maxHeight: '430px',
              '& > :not(style)': {
                m: 1,
                width: '90%',
                height: 40,
              },
            }}
          >
            {donations.map((a) => (
              <Paper key={a._id} style={{ backgroundColor: '#F0F0F0', padding: '5px 10px' }}>
                <h4 style={{ margin: 0 }}>
                  {a.donationItem} - {a.donationQuantity} by {a.name}
                </h4>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Box sx={{ bgcolor: 'grey', height: '80vh', padding: 2 }}>
          <h3>Volunteered Activities</h3>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // center children horizontally
              overflowY: 'auto',
              maxHeight: '430px',
              '& > :not(style)': {
                m: 1,
                width: '90%',
                height: 40,
              },
            }}
          >
            {activities.map((a) => (
              <Paper
                key={a._id}
                style={{ backgroundColor: '#F0F0F0', width: '100%', padding: '5px 10px' }}
              >
                <h4 style={{ margin: 0 }}>{a.Activity}</h4>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default DashboardGrids;
