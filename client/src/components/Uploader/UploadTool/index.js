import { Box, Grid } from "@mui/material";
import React from "react";
import EventInformation from "./EventInformation";
import Upload from "./Upload";

export default function index() {
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
          <EventInformation />
        </Grid>
        <Grid item xs={12}>
          <Upload/>
        </Grid>
      </Grid>
    </Box>
  );
}
