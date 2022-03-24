import { Container, Grid, List, ListItem, ListItemButton, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import BgImage from '../../assets/home-bg.svg'
import SideMenu from '../../components/Uploader/SideMenu'

export default function Layout() {
    return (
        <Container maxWidth="lg" sx={{
            backgroundImage: `url(${BgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
        }}>
            <Grid container sx={{ display: 'flex' }} spacing={5}>
                <Grid item xs={3}>
                    <Typography variant="h5">Uploader Panel</Typography>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                        <SideMenu />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Outlet />
                    </Grid>
                </Grid>

            </Grid>
        </Container >
    )
}
