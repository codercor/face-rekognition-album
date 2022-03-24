import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import UplodActionButtons from "./UplodActions";

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

export default function Upload() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  return (
    <Box sx={boxStyle}>
      <Grid container>
        <Grid item xs={6}>
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
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
              </Grid>
              <Grid item xs={12} container>
                {selectedImages.length > 0 &&
                  selectedImages.map((item, i) => (
                    <Grid item xs={3}>
                      {" "}
                      <Box sx={{
                        width: "100%",
                        height: "80px",
                        background: "rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }} key={i}>
                        <img
                          src={item.src}
                          style={{ height:"100%" }}
                        />
                      </Box>{" "}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
}
