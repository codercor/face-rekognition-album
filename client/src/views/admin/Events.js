import { Grid, Box, TextField, Button } from '@mui/material';
import React from 'react';
import EventForm from '../../components/Admin/EventForm';
import { useSelector, useDispatch } from 'react-redux';

export default function Events() {
  const dispatch = useDispatch();
  const adminState = useSelector(state => state.admin);
  return <div style={{
    width: '100%',
  }}>
    <Grid container sx={{width:'100%'}} spacing={2}>
      <Grid item xs={12}>
        <EventForm />
      </Grid>
      <Grid item xs={12}>
        { adminState.newItem.isOk && <Box p={2}>
          <TextField value={"http://localhost:3001/event/"+adminState.newItem.eventName} disabled fullWidth label="Event Link" />
          <Button
           onClick={()=>{
              //copy to clipboard
              const url = "http://localhost:3001/event/"+adminState.newItem.eventName;
              //copy the url
              navigator.clipboard.writeText(url);
           }}
          fullWidth variant="contained" color="primary">
            Copy Link
          </Button>
        </Box>}
      </Grid>
    </Grid>
  </div>;
}
