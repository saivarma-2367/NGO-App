import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function VolunteerLoginComp({ onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/vdata', {
        method: 'post',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      console.log('Login Submitted Successfully', loginData);
      setLoginData({ name: '', email: '', password: '' });
      if (onLoginSuccess) {
        onLoginSuccess(loginData.name);
      }
    } catch (error) {
      console.log('error occurred posting volunteer info', error);
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: 'grey',
            height: '50vh',
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
            borderRadius: 2,
          }}
        >
          <h3 style={{ paddingTop: 10, textAlign: 'center' }}>Login / Registration Page</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Name:</label>
            <input
              type="text"
              value={loginData.name}
              name="name"
              onChange={handleChange}
              style={{ margin: '5px 0', width: '250px', padding: '5px' }}
            />
            <label>Email:</label>
            <input
              type="email"
              value={loginData.email}
              name="email"
              onChange={handleChange}
              style={{ margin: '5px 0', width: '250px', padding: '5px' }}
            />
            <label>Password:</label>
            <input
              type="password"
              value={loginData.password}
              name="password"
              onChange={handleChange}
              style={{ margin: '5px 0', width: '250px', padding: '5px' }}
            />
            <button type="submit" style={{ marginTop: '10px', padding: '8px 20px', borderRadius: '20px', backgroundColor: 'black', color: 'white' }}>
              Submit
            </button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default VolunteerLoginComp;
