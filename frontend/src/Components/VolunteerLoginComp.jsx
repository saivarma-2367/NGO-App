import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { padding } from '@mui/system';

function VolunteerLoginComp() {
  const [loginData,setLoginData]=useState({email:'',password:''});

  const handleChange=(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Login Submitted Successfully",loginData);
    setLoginData({email:'',password:''});
  }

  return (
    <div >
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '50vh' ,marginTop:'30px'}} >
          <h3 style={{paddingTop:30}}>Login/Registration Page</h3>
      <form onSubmit={handleSubmit}>
        <label>Email: </label><br />
        <input type='email' value={loginData.email} name='email' onChange={handleChange} /><br />
        <label>password: </label><br />
        <input type='text' value={loginData.password} name='password' onChange={handleChange} /><br />
        <button type='submit' onClick={handleSubmit} >Submit</button>
      </form>
      </Box>
      </Container>
    </div>
  )
}

export default VolunteerLoginComp