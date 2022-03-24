import Icon from "@mdi/react";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import {
  mdiImageSearchOutline as fileIcon,
  mdiDeleteVariant as deleteIcon,
  mdiCloudUpload as uploadIcon,
} from "@mdi/js";
export default function UplodActionButtons({
  selectedImages,
  setSelectedImages,
}) {
  const fileInputRef = React.createRef();
  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };

  
  const handleFileInputChange = (e) => {
    setSelectedImages([])
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImages((prev) => [...prev, { file, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };
  const DeleteAllHandler = () => {
    setSelectedImages([]);
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
        <Button variant="contained" color="secondary">
          <Icon path={uploadIcon} size={1} color="white" />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="overline">SEÇİLEN {selectedImages.length} 👉🏼 YÜKLENEN {3} </Typography>
      </Grid>
    </Grid>
  );
}
