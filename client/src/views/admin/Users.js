import { Grid } from "@mui/material";
import React from "react";
import UserForm from "../../components/Admin/UserForm";
import UsersList from "../../components/Admin/UsersList";

export default function Users() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UserForm/>
      </Grid>
      <Grid item xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  );
}
