import React from 'react';
import '../styles/NavBar.css';
import img1 from  '../Images/help.png';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Ic1 from '../Images/donation.png';
import Ic2 from '../Images/volunteer.png';
import Ic3 from '../Images/admin.png';
import { useNavigate } from 'react-router-dom';

function NavBarVolunteer() {
  const navigate=useNavigate();
    const handleDonationNavigate =()=>{
      navigate('/donate')
    }
    const handleAdminNavigate =()=>{
      navigate('/admin')
    }
  return (
    <div><div className='nav-container' >
      <div className='left-fBox'>
        <img src={img1} alt='helping hands' />
        <h2>Helping Hands </h2>
      </div>
      <div>
        <h2>Together, We Give Hope a Hand</h2>
      </div>
      <div className='Right-fBox'>
        <Button variant="contained" onClick={handleDonationNavigate}endIcon={ <img src={Ic1} alt="donation"style={{ width: 20, height: 20, objectFit: 'contain', marginBottom: 10 ,marginLeft:0}} /> }>
           Donate
         </Button>
         <Button variant="contained" onClick={handleAdminNavigate}endIcon={ <img src={Ic3} alt="admin"style={{ width: 20, height: 20, objectFit: 'contain',marginBottom: 10 ,marginLeft:0}} /> }>
           Admin
         </Button>
      </div>
    </div></div>
  )
}

export default NavBarVolunteer