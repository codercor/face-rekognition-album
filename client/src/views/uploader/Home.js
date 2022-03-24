import { Lock } from "@mui/icons-material";
import {
  Grid,
  Box,
  Typography,
  Select,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import EventSelect from '../../components/Uploader/EventSelect';
import UploadTool from '../../components/Uploader/UploadTool';
export default function Home() {
  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12}>
            <EventSelect/>
        </Grid>
        <Grid item xs={12}>
            <UploadTool/>
        </Grid>
      </Grid>
    </Box>
  );
}
