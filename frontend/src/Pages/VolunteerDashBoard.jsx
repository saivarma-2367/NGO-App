import React, { useState } from 'react'
import VolunteerLoginComp from '../Components/VolunteerLoginComp'
import NavBarVolunteer from '../Components/NavBarVolunteer'
import VolunteerContent from '../Components/VolunteerContent'

function VolunteerDashBoard() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [volunteerName,setVolunteerName]=useState('');

  const handleLoginSuccess =(name)=>{
    setVolunteerName(name);
    setIsLoggedIn(true);
  } 

  return (
    <div>
      <NavBarVolunteer />
      {!isLoggedIn ? (<VolunteerLoginComp onLoginSuccess={handleLoginSuccess} />):(<VolunteerContent volunteerName={volunteerName} />)}
    </div>
  )
}

export default VolunteerDashBoard