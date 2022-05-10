import { Box, Grid } from "@mui/material";
import React from "react";
import EventInformation from "./EventInformation";
import Upload from "./Upload";
import UploadedPhotos from "./UploadedPhotos";

import {useDispatch,useSelector} from 'react-redux';
import {getUploadedPhotos} from '../../../features/uploaderSlice'
export default function Index() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.uploader.uploadedPhotos);
  //event name
  const eventName = useSelector((state) => state.uploader.selectedEvent);
  console.log("eventName", eventName);
  React.useEffect(() => {
    dispatch(getUploadedPhotos(eventName));
  }, [])
  
  return (
    <Box
      sx={{
        width: "90%",
        height: "600px",
        background: "rgba(255,255,255,0.7)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        borderRadius: "4px",
        padding: "10px 16px",
        border: "1px solid rgba(0,0,0,0.5)",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <EventInformation uploadedPhotos={photos}  />
        </Grid>
        <Grid item xs={6}>
          <Upload uploadedPhotos={photos} />
        </Grid>
        <Grid item xs={6}>
          <UploadedPhotos photos={photos}/>
        </Grid>
      </Grid>
    </Box>
  );
}
