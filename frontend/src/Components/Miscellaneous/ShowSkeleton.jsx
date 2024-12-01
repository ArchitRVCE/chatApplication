import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';


const ShowSkeleton = () => {
  return (
    // <Stack spacing={1}>
    //   {/* For variant="text", adjust the height via font-size */}
    //   <Skeleton variant="rectangular" sx={{ borderRadius: '20px' }} width={210} height={55} />
    //   <Skeleton variant="rectangular" sx={{ borderRadius: '20px' }} width={210} height={55} />
    //   <Skeleton variant="rectangular" sx={{ borderRadius: '20px' }} width={210} height={55} />
    //   <Skeleton variant="rectangular" sx={{ borderRadius: '20px' }} width={210} height={55} />
    // </Stack>
    <>
        {Array.from({ length: 6 }).map((_, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <Skeleton 
              variant="rectangular" 
              sx={{ borderRadius: '20px' }} 
              width={210} 
              height={55} 
            />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  )}
export default ShowSkeleton
