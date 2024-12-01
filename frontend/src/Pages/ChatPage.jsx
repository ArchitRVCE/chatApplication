import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import MyChats from "../Components/Miscellaneous/MyChats.jsx"
import ChatBox from "../Components/Miscellaneous/ChatBox.jsx"
import SideDrawer from "../Components/Miscellaneous/SideDrawer.jsx"


import { chatState } from '../Context/ChatProvider'
const ChatPage = () => {
  const {user} = chatState();

  return <div style={{width: "100%"}}>
      {user && <SideDrawer/>}
      <Box component="section" sx={{
    p: 2,
    display: 'flex', // Enable flexbox
    flexDirection: 'row', // Set direction to row
  }}>
      {user && <MyChats/>}
      {user && <ChatBox/>}
    </Box>
  </div>
}

export default ChatPage
