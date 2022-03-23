import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Icon } from "@mdi/react";
import {
  mdiEyeCircle as eye,
  mdiDownloadCircle as download,
  mdiCheckboxMultipleMarkedCircle as select,
  mdiCropFree as free,
} from "@mdi/js";
import EventPopup from "./EventPopup";

import { selectPhoto } from "../../features/eventSlice";
import { useDispatch } from "react-redux";

const ActionButton = ({ icon, onClick }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    color="secondary"
    sx={{
      borderColor: {
        xs: "rgba(255,255,255,0.54)",
      },
      backdropFilter: "blur(4px)",
      width: "50px",
      minWidth: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Icon path={icon} size={1} color="white" />
  </Button>
);

export default function Photo({ photo, isPaid }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const showPhoto = () => {
    setOpen(true);
  };
  const selectPhotoForDownload = () => {
    dispatch(selectPhoto(photo));
  }
  const downloadPhoto = () => {
    let link = document.createElement("a");
    link.href = `https://face-album-bucket.s3.amazonaws.com/${photo}`;
    link.download = photo;
    link.click();
  };
  const ActionButtons = () => (
    <Grid container>
      <Grid item xs={4}>
        <ActionButton icon={eye} onClick={showPhoto} />{" "}
      </Grid>
      {!isPaid && (
        <Grid item xs={4}>
          <ActionButton icon={download} onClick={downloadPhoto} />
        </Grid>
      )}
      {!isPaid && (
        <Grid item xs={4}>
          <ActionButton icon={select} onClick={selectPhotoForDownload} />
        </Grid>
      )}
    </Grid>
  );
  const CopyOfThisComponent = () => {
    return (
      <img src={`https://face-album-bucket.s3.amazonaws.com/${photo}`} alt="" />
    );
  };
  return (
    <div
      style={{
        width: "45%",
        overflow: "auto",
        height: "200px",
        backgroundColor: "rgba(0,0,0,0.6)",
        position: "relative",
        margin: "5px",
        display: "flex",
      }}
    >
      {
        <EventPopup open={open} handleClose={handleClose}>
          <Box
            sx={{
              display: "flex",
              width: "auto",
              height: {
                xs: "20vh",
                md: "35vh",
              },
              border: "1px solid white",
              justifyContent: "center",
            }}
          >
            <CopyOfThisComponent />
          </Box>
        </EventPopup>
      }
      <img
        style={{
          height: "100%",
          width: "100%",
          aspectRatio: "auto",
          objectFit: "scale-down",
        }}
        src={`https://face-album-bucket.s3.amazonaws.com/${photo}`}
        alt=""
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ActionButtons />
      </div>
    </div>
  );
}
