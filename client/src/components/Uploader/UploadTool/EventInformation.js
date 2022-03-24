import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
export default function EventInformation() {
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
          <Grid item xs={4}  sx={{p:3}} >
            <Typography variant="overline">Etkinlik kodu</Typography> : <Typography variant="caption">Event Name</Typography>
          </Grid>
          <Grid item xs={4}  sx={{p:3}} >
            <Typography variant="overline">Admin</Typography> : <Chip color="success" label="Cenga" />
          </Grid>
          <Grid item xs={4}  sx={{p:3}} >
            <Typography variant="overline">Etkinlik Tipi</Typography> : <Chip color="secondary" label="Sponsorlu" />
          </Grid>
      </Grid>
    </Box>
  );
}
