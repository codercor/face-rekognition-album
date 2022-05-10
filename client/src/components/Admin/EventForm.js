import React, { useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Grid, TextField, Button, IconButton, CardMedia, Switch, Typography, Box } from '@mui/material';
import { Add, Clear, Create, Face, UploadFile } from '@mui/icons-material';
import { createEvent, setNewItem, uploadImage } from '../../features/adminSlice';
import { mdiFaceRecognition } from '@mdi/js'
import { Icon } from '@mdi/react'

export default function EventForm() {
  let defaultImage = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const dispatch = useDispatch();
  const adminState = useSelector(state => state.admin);

  const imageURL = useMemo(() => {
    return selectedImage === defaultImage ? selectedImage : URL.createObjectURL(selectedImage);
  }, [selectedImage]);


  console.log(adminState);
  const fileSelectHandle = (e) => {
    let file = e.target.files[0];
    //check the file type is image
    if (!file.type.match('image.*')) {
      alert('The file is not an image');
      e.target.value = '';
      setSelectedImage(defaultImage);
      return;
    }
    setSelectedImage(file);
  }

  const handleNewEventChange = (e) => {
    let { name, value } = e.target;
    dispatch(setNewItem({
      ...adminState.newItem,
      [name]: value
    }));
  }

  const fileRef = useRef(null);

  const theFile = useMemo(() => {
    return fileRef.current;
  }, [fileRef.current]);

  return <Grid container spacing={5}>
    <Grid item xs={12} md={4}>
      <TextField autoComplete="off" name="eventName" value={adminState.newItem.eventName} onChange={handleNewEventChange} fullWidth label="Event Name" />
      <Switch name="isPaid" checked={eval(adminState.newItem.isPaid)} onChange={(e) => {
        e.target.value = e.target.checked;
        handleNewEventChange(e);
      }} />
      <Typography variant="caption"> Paid </Typography>
      <img width="100%" src={imageURL} />
      <input style={{ visibility: 'hidden' }} ref={fileRef} hidden type="file" onChange={fileSelectHandle} />
      <Button onClick={() => {
        console.log(fileRef);
        fileRef.current.click();
      }} fullWidth variant="contained" color="primary">
        <Add />   Select Background Image
      </Button>
      <Button onClick={() => {
        console.log(theFile.files[0]);
        dispatch(uploadImage(
          theFile.files[0]
        ));
      }} disabled={selectedImage == defaultImage} fullWidth sx={{ marginTop: '10px' }} variant="contained" color="primary">
        <UploadFile />  Upload
      </Button>
      <Button disabled={selectedImage == defaultImage} onClick={() => {
        setSelectedImage(defaultImage);
        fileRef.current.value = '';
      }} fullWidth color="warning" variant="contained" sx={{ marginTop: '10px' }}>
        <Clear /> Delete
      </Button>
      <Button 
        onClick={() => {
          dispatch(createEvent(adminState.newItem));
        }}
      disabled={(selectedImage == defaultImage || adminState.newItem.backgroundImage == "" || adminState.newItem.eventName == "")} fullWidth sx={{ marginTop: '10px' }} variant="contained" color="error">
        <Create />  Create Event
      </Button>
    </Grid>
    <Grid item xs={12} md={8}>
      <Typography variant="h2">
        Event Preview
      </Typography>
      <Box mt={2} sx={
        {
          height: '50vh',
          width: '100%',
          background: `url('${imageURL}')`,
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }
      }>
        <Typography sx={
          {
            padding: '10px',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'rgba(0,0,0,0.5)',
            margin: '5px',
          }
        } variant="h3">
          {adminState.newItem.eventName}
        </Typography>
        <Button variant="contained" color="primary">
          <Icon path={mdiFaceRecognition} size={1} color="#ffffff" /> &nbsp; Yüz tanıtmaya geç
        </Button>


      </Box>
    </Grid>
  </Grid>;
}
