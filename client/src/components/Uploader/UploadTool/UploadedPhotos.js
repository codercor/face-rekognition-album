import { Box, Typography } from "@mui/material";
import React,{useId} from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const boxStyle = {
  width: "100%",
  height: "500px",
  background: "rgba(255,255,255,0.7)",
  display: "flex",
  justifyContent: "space-around",
  borderRadius: "6px",
  padding: "5px 5px",
  border: "1px solid rgba(40,0,0,0.5)",
  overflow: "auto",
  flexDirection: "column",
  alignItems: "center",
};
export default function UploadedPhotos({ photos }) {
    
  return (
    <Box sx={boxStyle}>
      <Typography variant="h5">Uploaded Photos</Typography>
      <ImageList sx={{ width: "auto", height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {photos.map((item) => (
          <ImageListItem  key={Math.random()*99999}>
            <img
              src={`https://face-album-bucket.s3.amazonaws.com/${item.key}`}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
