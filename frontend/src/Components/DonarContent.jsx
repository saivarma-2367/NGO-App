import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../styles/DonarDashboard.css';

function DonarContent() {
  const [formData,setFormData]=useState({
    name:'',age:'',phonenumber:'',email:''
  })
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("form submitted successfully",formData);
    setFormData({name:'',age:'',phonenumber:'',email:''});
  }

  return (
    <div className='main-div'>
      <div className='form-div'>
        <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '50vh' ,marginTop:'30px'}} >
          <h3>Donar Form</h3>
        <form onSubmit={handleSubmit}>
          <label>Name: </label><br />
          <input type='text' value={formData.name}  name='name' onChange={handleChange} /><br />
          <label>age: </label><br />
          <input type='number' value={formData.age}  name='age' onChange={handleChange} /><br />
          <label>Phone Number: </label><br />
          <input type='number' value={formData.phonenumber}  name='phonenumber'  onChange={handleChange} /><br />
          <label>email: </label><br />
          <input type='email' value={formData.email}  name='email' onChange={handleChange} /><br />
          <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
        </Box>
      </Container>
        
      </div>
      <div className='requirements-div'>
         <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '50vh' ,marginTop:'30px' }} >
          <h3>Donations Required</h3>
        </Box>
      </Container>
    </React.Fragment>
      </div>
    </div>
  )
}

export default DonarContent