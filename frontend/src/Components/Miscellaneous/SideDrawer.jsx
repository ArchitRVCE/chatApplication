import React, { useState } from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import { chatState } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import ShowSkeleton from "./ShowSkeleton.jsx";
import ResultProfile from "../SearchResult/ResultProfile.jsx"

const SideDrawer = () => {
  const navigate = useNavigate();
  const {user} = chatState();
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState();
  const logoutHandler = () =>{
    localStorage.removeItem("userInfo");
    navigate("/");
  }
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleSearchText = () =>{
    let text = document.getElementById('outlined-search').value;
    setSearch(text);
  }
  const searchHandler = async()=>{
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`
        }
      }
      const response = await axios.get(`/api/user?search=${search}`,config);
      const {users} = await response.data
      setSearchResult(users);
      setLoading(false);
      console.log('Khaman',searchResult)
    } catch (error) {
      console.log(`Error occured!:${error.name,error.message}`);
      setLoading(false);
    }
   // toggleDrawer(false)
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <div style={{display:"flex"}}>
        <TextField onChange={handleSearchText} id="outlined-search" label="Search field" type="search" value={search}/>
        <Button onClick={searchHandler}>GO</Button></div>
        {loading ? <ShowSkeleton/> : searchResult.map((searchItem, index) => (
          <ListItem key={searchItem._id} disablePadding>
            <ListItemButton>
              <ResultProfile name={searchItem.name} email={searchItem.email} pic={searchItem.pic}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="section"
    sx={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '5px 10px',
      borderWidth: '5px', 
      borderStyle: 'solid',
      backgroundColor: '#f5f5f5',
    }}>
      <Button onClick={toggleDrawer(true)}>Search User</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
        <span style={{color: 'black'}}>Talk-A-Tive</span>
        <div onClick={logoutHandler}
  style={{
    width: '25px', // Width of the profile image
    height: '25px', // Height of the profile image (same as width for a circle)
    borderRadius: '50%', // Makes the div circular
    overflow: 'hidden', // Ensures the image fits within the circle
    border: '2px solid #ccc',color:'black',cursor: 'pointer' // Optional border
  }}
>
  <img
    src={user.name} // Replace with your profile image URL
    alt={user.name}
    style={{
      width: '100%', // Make the image fit the container
      height: '100%', // Ensure the image covers the div
      objectFit: 'cover', // Maintains aspect ratio and covers the circle
    }}
  />
</div>
    </Box>
  )
}

export default SideDrawer
