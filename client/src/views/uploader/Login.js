import { Container, Typography, Box, TextField, Grid, Button } from '@mui/material'
import React, { useState } from 'react'
import BgImage from '../../assets/home-bg.svg'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login as loginUploader } from '../../features/userSlice'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }


    return (
        <Container sx={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: `url(${BgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        } maxWidth="sm">

            <Box m={2} p={4} sx={{
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'invert(0.5) opacity(0.1)',
            }} >
                <Grid container sx={{ display: 'flex' }} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography sx={{ textAlign: "center" }} variant="h4">
                            Uploader Login
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField name="username" value={loginData.username} onChange={handleChange} fullWidth label="Username" />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField name="password" value={loginData.password} onChange={handleChange} fullWidth label="Password" />
                    </Grid>
                    <Grid item xs={9}>
                        <Button onClick={() => {

                            dispatch(loginUploader(loginData)).then(res => {
                                console.log("RES", res);
                                if (res.payload.token && res.payload.user.role === "uploader") {
                                    navigate('/uploader');
                                } else {
                                    console.log("ERROR LOGIN");
                                }
                            }).catch(err => {
                                console.log("ERR", err);
                            })

                        }} fullWidth variant="contained" color="secondary">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
