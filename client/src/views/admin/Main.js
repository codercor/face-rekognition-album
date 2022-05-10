import React from 'react';
import { Outlet } from 'react-router-dom'
import { Container, Grid } from '@mui/material';
import SideBar from '../../components/Admin/SideBar';

import './style.css'
export default function Main() {
    return <Container className='admin-container' maxWidth="lg">
        <Grid className='admin-container-grid' container mt={5} spacing={3}>
            <Grid item xs={12} md={2}>
                <SideBar />
            </Grid>
            <Grid item xs={12} md={10}>
                <Outlet />
            </Grid>
        </Grid>
    </Container>;
}
