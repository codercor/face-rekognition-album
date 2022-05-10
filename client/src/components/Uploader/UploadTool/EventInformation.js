import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import {  useSelector } from "react-redux";
export default function EventInformation({uploadedPhotos}) {
  const eventInfo = useSelector(state => state.uploader.availableEvents.find(event => event.name === state.uploader.selectedEvent));
  console.log("EVENT INFO",eventInfo);
  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        background: "rgba(255,255,255,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "4px",
        padding: "0px 16px",
        border: "1px solid rgba(40,0,0,0.5)",
        padding: 0,
        overflow:"auto"
      }}
    >
      <Grid container>
          <Grid item xs={3}  sx={{p:3,border:'1px gray solid'}} >
            <Typography sx={{fontSize:'8px',fontWeight:'bold'}} variant="overline">Etkinlik kodu</Typography> : <Typography sx={{fontSize:'7px'}} variant="caption"> {eventInfo.name} </Typography>
          </Grid>
          <Grid item xs={3}  sx={{p:3,border:'1px gray solid'}} >
            <Typography sx={{fontSize:'7px'}} variant="overline">Etkinlik Tipi</Typography> : <Chip sx={{fontSize:'7px'}} color="secondary" label={eventInfo.isPaid ? 'Ücretli':'Ücretsiz'} />
          </Grid>
          <Grid item xs={3}  sx={{p:3,border:'1px gray solid'}} > 
            <Typography sx={{fontSize:'7px'}} variant="overline">Fotoğraf</Typography> : <Chip sx={{fontSize:'7px'}} color="primary" label={`${uploadedPhotos.length} `} />
          </Grid>
      </Grid>
    </Box>
  );
}
