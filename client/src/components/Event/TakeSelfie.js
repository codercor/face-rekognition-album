import React, { useEffect, useState } from 'react'
import {
    Container, Stack, Box, Typography, Button, Grid
} from '@mui/material'
import Camera from './Camera'
export default function TakeSelfie() {
    
    return (
        <Box sx={{
            width: '70%',
            height: '70vh',
            backdropFilter: 'grayscale(70%) blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0px',
            border: '1px red solid'
        }}>
            <Typography variant="subtitle1" color="white">
                Sizi tanımamız için bize bir selfie çekin
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} >
                    <Camera/>
                </Grid>
            </Grid>
        </Box>
    )
}
