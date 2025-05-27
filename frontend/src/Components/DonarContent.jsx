import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../styles/DonarDashboard.css';
import Paper from '@mui/material/Paper';

function DonarContent() {
  const [activities, setActivities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    name: '', age: '', phoneNumber: '', email: '', donationItem: '', donationQuantity: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveDonarData();
    await fetchInventory();
    console.log("form submitted successfully", formData);
    setFormData({ name: '', age: '', phoneNumber: '', email: '', donationItem: '', donationQuantity: '' });
  };

  const saveDonarData = async () => {
    try {
      const res = await fetch('http://localhost:5000/saveDonar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      console.log("Data saved:", data);
    } catch (error) {
      console.log("Error occurred saving donor info:", error.message);
    }
  };

  const fetchInventory = async () => {
    fetch('http://localhost:5000/inventory')
      .then((res) => res.json())
      .then((data) => setRequirements(data))
      .catch((error) => console.log('error occurred while fetching inventory info.', error));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className='main-div' style={{ textAlign: 'center' }}>
      <div className='form-div'>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: 'grey', height: '50vh', marginTop: '30px', padding: 2 }}>
            <h3>Donar Form</h3>
            <form onSubmit={handleSubmit}>
              <label>Name:</label><br />
              <input style={{ width: 180 }} type='text' value={formData.name} name='name' onChange={handleChange} placeholder='Enter Your Name' /><br />
              <label>Age:</label><br />
              <input style={{ width: 180 }} type='number' value={formData.age} name='age' onChange={handleChange} placeholder='Enter Your Age' /><br />
              <label>Phone Number:</label><br />
              <input style={{ width: 180 }} type='number' value={formData.phoneNumber} name='phoneNumber' onChange={handleChange} placeholder='Enter Your Phone Number' /><br />
              <label>Email:</label><br />
              <input style={{ width: 180 }} type='email' value={formData.email} name='email' onChange={handleChange} placeholder='Enter Your Email' /><br />
              <label>Item For Donation:</label><br />
              <input style={{ width: 180 }} type='text' value={formData.donationItem} name='donationItem' onChange={handleChange} placeholder='Enter Your Item' /><br />
              <label>Quantity of Donation:</label><br />
              <input style={{ width: 180 }} type='text' value={formData.donationQuantity} name='donationQuantity' onChange={handleChange} placeholder='Enter Your Quantity' /><br />
              <button style={{ backgroundColor: 'black', color: 'white', marginTop: 10, width: 75, borderRadius: 50 }} type='submit'>Submit</button>
            </form>
          </Box>
        </Container>
      </div>
      <div className='requirements-div'>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: 'grey', height: '50vh', marginTop: '30px', padding: 2 }}>
            <h3>Donations Required</h3>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              '& > :not(style)': { m: 1, width: 500, height: 40 },
              alignContent: 'center',
            }}>
              {requirements.map((r) => (
                <Paper key={r._id} style={{ backgroundColor: '#F0F0F0', width: 520, marginLeft: 15 }}>
                  <h4 style={{ margin: 0, padding: 5 }}>{r.name} - {r.quantity}</h4>
                </Paper>
              ))}
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default DonarContent;
