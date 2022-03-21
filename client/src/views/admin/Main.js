import React from 'react';
import { Outlet } from 'react-router-dom'
import { Container, Grid } from '@mui/material';
import SideBar from '../../components/Admin/SideBar';

export default function Main() {
    return <Container maxWidth="lg">
        <Grid container mt={5} spacing={3}>
            <Grid item xs={12} md={2}>
                <SideBar />
            </Grid>
            <Grid item xs={12} md={10}>
                <Outlet />
            </Grid>
        </Grid>
    </Container>;
}
