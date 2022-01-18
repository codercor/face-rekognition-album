import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/face-draw.svg';
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
      sx={{
          background: '#e7008a',
      }}
      >
        <Toolbar >
        <img src={
          logo
        }  style={{width:'30px'}} /> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Face Album
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
