import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Signup from '../Components/Authentication/Signup';
import Login from '../Components/Authentication/Login';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  useState(()=>{
    const user = JSON.parse(localStorage.getItem("uerInfo"));
    if(user){
      navigate("/chat");
    }
  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container maxWidth='md'>
        <Box component="section" sx={{
        p: 4,
        borderRadius: '10px',
        width: '100%',
        border: 'none',
        borderRadius: '16px', // Adds border radius
        display: 'flex', // Enable flexbox layout
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        backgroundColor: 'white', // Set background color to white
        color: 'black', // Set font color to black
        fontFamily: 'Work Sans, sans-serif', // Set font family
        fontSize: '40px', 
        height: '100px', // Optional: Set a height to center within the box
      }}>
          Talk-A-Tive
        </Box>
        <Box component="section" sx={{
            p: 4,
            mt: '5%', // Sets margin-top to 10% of the parent container's height
            mx: 'auto', // Centers the box horizontally
            width: '100%',
            border: 'none',
            borderRadius: '16px', // Adds border radius
            // display: 'flex', // Enable flexbox layout
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            backgroundColor: 'white', // Set background color to white
            color: 'black', // Set font color to black
            fontFamily: 'Work Sans, sans-serif', // Set font family
            fontSize: '40px', 
            height: 'fit-content', // Optional: Set a height to center within the box
        }}>
          <Tabs value={value} onChange={handleChange} centered sx={{
          width: '100%', // Ensure Tabs container takes full width
          display: 'flex',
          justifyContent: 'space-between'
        }}>
            <Tab sx={{width:'50%',fontSize: '40px',flex: 1, // Each tab occupies equal space
            textAlign: 'center'}} label="Login" />
            <Tab sx={{width:'50%',fontSize: '40px',flex: 1, // Each tab occupies equal space
            textAlign: 'center'}} label="Sign Up"/>
          </Tabs >
          <Box sx={{ p: 3, display:'flex', justifyContent:'center', mt:'2%',width:'100%'}}>
          {value === 0 && (
            <Typography variant="h6" component="div">
              <Login/>
            </Typography>
          )}
          {value === 1 && (
            <Typography variant="h6" component="div">
              <Signup/>
            </Typography>
          )}
        </Box>
        </Box>
        
      </Container>
    </>
  )
}

export default HomePage
