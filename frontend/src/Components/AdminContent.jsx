import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function AdminContent() {
  const [volunteers,setVolunteers]=useState([]);
  const [requirement,setRequirement]=useState({id:'',name:'',quantity:''});
  const [requirements,setRequirements]=useState([]);
  const [activity,setActivity]=useState('');
  const [activites,setActivities]=useState([]);
  const [donations,setDonations]=useState([]);
  const [rankings,setRankings]=useState([]);

  const handleInventorySubmit = async()=>{
    try{
      const res = await fetch('http://localhost:5000/idata', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requirement)
});

      const data=await res.json();
      console.log("Item Submitted Successfully",requirement);
      setRequirements([...requirements,requirement]);
      setRequirement({id:'',name:'',quantity:''});
      await fetchInventory();
    }
    catch(error){
      console.log('error occured posting item',error);
    }
  }

  const fetchInventory = async()=>{
    fetch('http://localhost:5000/inventory')
    .then((res)=>res.json())
    .then((data)=>setRequirements(data))
    .catch((error)=>console.log('error occured while fetching inventory info.',error));
  }

  const fetchVolunteersInfo = ()=>{
   fetch('http://localhost:5000/volunteers')
   .then((res)=>res.json())
   .then((data)=>{setVolunteers(data)})
    .catch((error)=>{
      console.log('Error occured while fetching posts',error);
    })
  }

 const handleRemove = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/inventory/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log('Item deleted:', data);
    setRequirements(prev => prev.filter(item => item._id !== id));
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const handleActivitySubmit = async () => {
    try {
        const res = await fetch('http://localhost:5000/adata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Activity: activity })
        });

        const data = await res.json();
        console.log("Activity Submitted Successfully", data);
        setActivities([...activites, data]); 
        setActivity('');
        await fetchActivities();
    } catch (error) {
        console.log('Error occurred posting item', error);
    }
};

const fetchActivities = async()=>{
  fetch('http://localhost:5000/activities')
  .then((res)=>res.json())
  .then((data)=>setActivities(data))
  .catch((error)=>console.log("error occured while fetching activities",error));
}

const fetchDonations=()=>{
  fetch('http://localhost:5000/donations')
  .then((res)=>res.json())
  .then((data)=>setDonations(data))
  .catch((err)=>console.log("error occured fetching donations.",err));
}

const fetchRankings=()=>{
  fetch('http://localhost:5000/rankings')
  .then((res)=>res.json())
  .then((data)=>setRankings(data))
  .catch((err)=>console.log("error occured fetching rankings",err));
}

  useEffect(()=>{
    fetchVolunteersInfo();
    fetchInventory();
    fetchActivities();
    fetchDonations();
    fetchRankings();
  },[]);

  return (
    <div className='GridsBox'>
      <CssBaseline />
      <Box className="grid-item1"><h3>Volunteers List</h3>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        margin:'none',
        padding:'none',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 40,
        },
        alignContent:'center',
      }}
    >
      {volunteers.map((v)=>(
      <Paper key={v.id} style={{backgroundColor:'#F0F0F0'}}>
        <h4 style={{margin:0,padding:5}}>{v.name} - {v.email} - {new Date(v.createdAt).toLocaleDateString()}(since)</h4>
      </Paper>
      ))}
    </Box>
      </Box>
      <Box className="grid-item1">
        <h3>Add/Remove Inventory Requirements</h3>
        <input type='text' value={requirement.name} name='Invenoty-Name' placeholder='Enter the name of the item  ' style={{marginRight:10}} onChange={(e)=>setRequirement({...requirement,name:e.target.value})}/>
        <input type='number' value={requirement.quantity} name='Invenoty-Qunatity' placeholder='Quantity  ' style={{marginRight:10,width:80}} onChange={(e)=>setRequirement({...requirement,quantity:e.target.value})}/>
        <button onClick={handleInventorySubmit} style={{borderRadius:50,backgroundColor:'black',color:'white',fontWeight:500}}>Add To Inventory</button>
        <Box
      sx={{
        display: 'flex',
    flexDirection: 'column',  
    flexWrap: 'nowrap',        
    height: '220px',         
    overflowY: 'auto', 
        margin:'none',
        padding:'none',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 40,
        },
        alignContent:'center',
      }}
    >
    {requirements.map((r) => (
  <Paper key={r._id} style={{ backgroundColor: '#F0F0F0' ,width:420
  }}>
    <h4 style={{ margin: 0, padding: 5 }}>
      {r.name} - {r.quantity}
      <button onClick={() => handleRemove(r._id)} style={{ marginLeft: 10,borderRadius:50,backgroundColor:'black',color:'white',fontWeight:500 }}>
        Remove from inventory
      </button>
    </h4>
  </Paper>
))}

    </Box>
      </Box>
      <Box className="grid-item1"><h3>Volunteers Activities List</h3>
      <input type='text' name='activity' value={activity}  placeholder='Enter the activity to be added: ' style={{marginRight:10,width:200}} onChange={(e)=>setActivity(e.target.value)}/>
      <button onClick={handleActivitySubmit}style={{ marginLeft: 10,borderRadius:50,backgroundColor:'black',color:'white',fontWeight:500 }}>Submit Activity</button><br/>
      <Box
      sx={{
        display: 'flex',
    flexDirection: 'column',  
    flexWrap: 'nowrap',        
    height: '220px',         
    overflowY: 'auto', 
        margin:'none',
        padding:'none',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 40,
        },
        alignContent:'center',
      }}
    >
    {activites.map((a) => (
  <Paper key={a._id} style={{ backgroundColor: '#F0F0F0' ,width:430}}>
    <h4
  style={{
    margin: 0,
    padding: 5,
    textDecoration: a.Status === 'completed' ? 'line-through' : 'none'
  }}
>
  {a.Activity}
  <button
    onClick={() => handleRemove(a._id)}
    style={{
      marginLeft: 10,
      borderRadius: 50,
      backgroundColor: 'black',
      color: 'white',
      fontWeight: 500
    }}
  >
    Remove from Activities
  </button>
</h4>

  </Paper>
))}

    </Box>
      </Box>
      <Box className="grid-item2">
        <h3>Donations Received</h3>
        <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',  
    flexWrap: 'nowrap',        
    height: '220px',         
    overflowY: 'auto',       
    margin: 'none',
    padding: 'none',
    '& > :not(style)': {
      m: 1,
      width: 500,
      height: 40,
    },
    alignContent: 'center',
  }}
>

    {donations.map((a, index) => (
  <Paper key={index} style={{ backgroundColor: '#F0F0F0', width:650 ,marginLeft:40}}>
    <h4
      style={{
        margin: 0,
        padding: 5
      }}
    >
      {a.donationItem} - {a.donationQuantity} by {a.name}
    </h4>
  </Paper>
))}


    </Box>
      </Box>
      <Box className="grid-item2"><h3>Volunteer Rankings</h3>
      <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',  
    flexWrap: 'nowrap',        
    height: '220px',         
    overflowY: 'auto',       
    margin: 'none',
    padding: 'none',
    '& > :not(style)': {
      m: 1,
      width: 500,
      height: 40,
    },
    alignContent: 'center',
  }}
>

    {rankings.map((a, index) => (
  <Paper key={index} style={{ backgroundColor: '#F0F0F0', width:650 ,marginLeft:40}}>
    <h4
      style={{
        margin: 0,
        padding: 5
      }}
    >
      {index+1} - {a.name}
    </h4>
  </Paper>
))}


    </Box>
      </Box>
    </div>
  )
}

export default AdminContent