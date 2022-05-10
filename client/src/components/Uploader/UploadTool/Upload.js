import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import React from "react";
import UplodActionButtons from "./UplodActions";
import { DeleteForever, Info as InfoIcon } from '@mui/icons-material'

import { setSelectedPhotos } from '../../../features/uploaderSlice'
import {useDispatch, useSelector} from "react-redux";

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
};


export default function Upload({uploadedPhotos}) {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const dispatch = useDispatch();
  const selectedPhotos = useSelector(state => state.uploader.selectedPhotos);
  console.log(selectedPhotos);
  
  const handleSetSelectedPhotos = (data)=>{
    dispatch(setSelectedPhotos(data));
  }
  return (
    <Box sx={boxStyle}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              ...boxStyle,
              border: "none",
              borderRight: "1px solid rgba(0,0,0,0.5)",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <UplodActionButtons
                  selectedImages={selectedPhotos}
                  setSelectedImages={handleSetSelectedPhotos}
                />
              </Grid>
              <Grid item xs={12} container>
                <ImageList rowHeight={100}   variant="masonry">
                  {selectedPhotos.length > 0 &&
                    selectedPhotos.map((item, i) => (
                      <ImageListItem  key={item.file.name} >
                        <img src={item.src}  />
                        <ImageListItemBar
                          title="Ready"
                          actionIcon={
                            <IconButton
                              sx={{ color: "rgba(255, 10, 10, 0.54)" }}
                              aria-label={`info about ${item.title}`}
                            >
                              <DeleteForever />
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                    ))}
                </ImageList>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
