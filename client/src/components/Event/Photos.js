import { mdiDownload, mdiSelectAll } from "@mdi/js";
import Icon from "@mdi/react";
import { Container, Grid, Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto, clearSelectedPhotos } from "../../features/eventSlice";
import Photo from "./Photo";

export default function Photos({ photos, isPaid }) {
  const selectedPhotos = useSelector((state) => state.event.selectedPhotos);
  const dispatch = useDispatch();
  const SelectAll = () => {
    if(photos.length!=selectedPhotos.length)dispatch(clearSelectedPhotos());
    photos.forEach((photo) => {
      dispatch(selectPhoto(photo));
    });
  };

  const DownloadManyHandler = () => {
    for (let i = 0; i < selectedPhotos.length; i++) {
      console.log("indiriliyor", selectedPhotos[i]);
      const photo = selectedPhotos[i];
      const link = document.createElement("a");
      link.href = `https://face-album-bucket.s3.amazonaws.com/${photo}`;
      link.target = "_blank";
      link.click();
    }
  }

  const DownloadMany = () => (
    <>
      ({selectedPhotos.length}/{photos.length})
      <Button onClick={SelectAll} variant="text">
        <Icon path={mdiSelectAll} size={1} color="white" />
      </Button>
      <Button variant="text" onClick={DownloadManyHandler} >
        <Icon path={mdiDownload}  size={1} color="white" />
      </Button>
    </>
  );
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" color="white">
        Face Album &copy; {selectedPhotos.length > 0 && <DownloadMany />}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {photos.map((photo, index) => {
          return <Photo key={index} photo={photo} isPaid={isPaid} />;
        })}
      </div>
    </Container>
  );
}
