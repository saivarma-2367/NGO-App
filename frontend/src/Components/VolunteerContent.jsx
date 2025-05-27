import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function VolunteerContent({ volunteerName }) {
  const [activities, setActivities] = useState([]);
  const [rankings, setRankings] = useState([]);

  const fetchActivities = () => {
    fetch('http://localhost:5000/activities')
      .then((res) => res.json())
      .then((data) => {
        const incompleteTasks = data.filter((activity) => activity.Status !== 'completed');
        setActivities(incompleteTasks);
      })
      .catch((err) => console.log("error occurred fetching activities", err));
  };

  const handleCompletion = (id) => {
    fetch(`http://localhost:5000/complete/${id}/${volunteerName}`, {
      method: 'PUT',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update task");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Task updated:", data);
        fetchActivities();
      })
      .catch((err) => console.error("Error completing task:", err));
  };

  const fetchRankings = () => {
    fetch('http://localhost:5000/rankings')
      .then((res) => res.json())
      .then((data) => setRankings(data))
      .catch((err) => console.log("error occurred fetching rankings", err));
  };

  useEffect(() => {
    fetchActivities();
    fetchRankings();
  }, []);

  return (
    <div className='GridsBox'>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: 'grey',
            height: '80vh',
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: 2,
          }}
        >
          <h3 style={{ textAlign: 'center' }}>Pending Tasks</h3>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'auto',
              width: '100%',
            }}
          >
            {activities.map((a) => (
              <div
                key={a._id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Paper style={{ backgroundColor: '#F0F0F0', width: 300, textAlign: 'center' }}>
                  <h4 style={{ margin: 0, padding: 5 }}>{a.Activity}</h4>
                </Paper>
                <button
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 50,
                    backgroundColor: 'black',
                    color: 'white',
                    marginLeft: 10,
                  }}
                  onClick={() => handleCompletion(a._id)}
                >
                  Mark As Done
                </button>
              </div>
            ))}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: 'grey',
            height: '80vh',
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: 2,
          }}
        >
          <h3 style={{ textAlign: 'center' }}>Volunteer Rankings</h3>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'auto',
              width: '100%',
            }}
          >
            {rankings.map((a, index) => (
              <Paper
                key={index}
                style={{
                  backgroundColor: '#F0F0F0',
                  width: 300,
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                <h4 style={{ margin: 0, padding: 5 }}>
                  {index + 1} - {a.name}
                </h4>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default VolunteerContent;
