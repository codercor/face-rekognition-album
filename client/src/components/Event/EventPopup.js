import { Backdrop, Button, Box } from "@mui/material";
import React from "react";

export default function EventPopup({ children, open, handleClose }) {
    console.log("Çalıştım");
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={open}
        onClick={handleClose}
      >
        {<Box>{children}</Box>}
      </Backdrop>
    </>
  );
}
