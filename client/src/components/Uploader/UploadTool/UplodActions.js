import Icon from "@mdi/react";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import {
  mdiImageSearchOutline as fileIcon,
  mdiDeleteVariant as deleteIcon,
  mdiCloudUpload as uploadIcon,
} from "@mdi/js";

import { useDispatch,useSelector } from "react-redux";
import { uploadSelectedPhotos } from "../../../features/uploaderSlice";

export default function UplodActionButtons({
  selectedImages,
  setSelectedImages,
}) {
  const fileInputRef = React.createRef();
  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };
  const dispatch = useDispatch();
  const selectedPhotos = useSelector(state => state.uploader.selectedPhotos);
  const selectedEvent = useSelector(state => state.uploader.selectedEvent);

  const [isCanUpload, setIsCanUpload] = React.useState(false);
  
  const handleFileInputChange = (e) => {
    setSelectedImages([])
    setIsCanUpload(false);
    const files = e.target.files;
    const photosData = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        photosData.push({
          file,
          src: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
    const readPhotos = new Promise((resolve, reject) => {
     const interval = setInterval(() => {
        if (photosData.length === files.length) {
          resolve(photosData);
          clearInterval(interval);
          setIsCanUpload(true);
        }
      });
    })
    readPhotos.then((data) => {
      setSelectedImages(data);
    });
  };
  const DeleteAllHandler = () => {
    setSelectedImages([]);
    setIsCanUpload(false);
  }

  const handleUploadPhotos = () => {
    const photos = selectedPhotos.map((item) => item.file);
    dispatch(uploadSelectedPhotos({photos, folder:selectedEvent}));
  }

  return (
    <Grid container alignContent="flex-start">
      
      <Grid
        item
        xs={4}
        justifyContent="space-around"
        display="flex"
        alignItems="center"
        flexDirection="row"
        height="fit-content"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept=".jpg,.jpeg"
          style={{ display: "none" }}
        />
        <Button
          onClick={handleFileSelectClick}
          variant="contained"
          color="primary"
        >
          <Icon path={fileIcon} size={1} color="white" />
        </Button>
      </Grid>
      <Grid
        item
        xs={4}
        justifyContent="space-around"
        display="flex"
        alignItems="center"
        flexDirection="row"
        height="fit-content"
      >
        <Button onClick={DeleteAllHandler} variant="contained" color="error">
          <Icon path={deleteIcon} size={1} color="white" />
        </Button>
      </Grid>
      <Grid
        item
        xs={4}
        justifyContent="space-around"
        display="flex"
        alignItems="center"
        flexDirection="row"
        height="fit-content"
      >
        <Button variant="contained" disabled={!isCanUpload}
        onClick={handleUploadPhotos} color="secondary">
          <Icon path={uploadIcon} size={1} color="white" />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="overline">SEÇİLEN {selectedImages.length} 👉🏼 YÜKLENEN {3} </Typography>
      </Grid>
    </Grid>
  );
}
