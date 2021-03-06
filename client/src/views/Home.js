import React,{useEffect,useState} from 'react'
import { Container, Box, Stack, TextField, Grid, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Icon } from '@mdi/react'
import { mdiFaceRecognition } from '@mdi/js'
import BgImage from '../assets/home-bg.svg'
import FaceDraw from '../assets/face-draw.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
//import {  } from '../features/eventSlice'
export default function Home() {
    const [loading, setLoading] = React.useState(false);
    const [eventName,setEventName] = useState("");
    const handleClick = () => {
        setTimeout(() => {
            setLoading(false);
            navigate(`/event/${eventName}`);
        }, 1000);
    }
    const navigate = useNavigate()
    const handleChange = (e) => {
        setEventName(e.target.value);
    }

    return (
        <Container maxWidth="md" sx={{
            background: `url('${BgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '35vh'
        }}>
            <Stack>
                <div sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }} >
                    <div className="electricity-container">
                        <div className="electricity"></div>
                        <img src={FaceDraw} style={{
                            width: '20%'
                        }} />
                    </div>
                </div>
            </Stack>
            <Stack >
                <Grid container spacing={3} mt={3} flexDirection="column" alignItems="center" justifyContent="stretch">
                    <Grid item xs={6} sm={6} xs={8}>
                        <Typography variant="h5" color="textPrimary">
                            FaceAlbum
                        </Typography>
                        <Typography variant="caption" color="textPrimary">
                            Basit ve kullan??m?? kolay bir y??z arama uygulamas??d??r.
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <TextField onChange={handleChange} label="Etkinlik Kodu" placeholder='ahmet-ayse-dugun' autoComplete="false" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={8} sm={5}>
                        <LoadingButton
                            onClick={handleClick}
                            endIcon={<Icon path={mdiFaceRecognition} size={1} color="#e7008a" />}
                            loading={loading}
                            loadingPosition="end"
                            variant="outlined"
                        >
                            Y??z tan??tmaya ge??
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Stack>
            <Stack mt={8}>
                <Grid container justifyContent="space-between" mt={8}>
                    <Grid item xs={3} sm={3}>
                        <img style={{ width: '100%' }} src={require('../assets/selfie1.png')} />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Typography variant="caption" color="textSecondary">
                            Selfie'ni ??ek ve y??z??n?? tan??t ard??ndan foto??raflar??n?? g??r??nt??le.
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <img style={{ width: '100%' }} src={require('../assets/family.jpg')} />
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}
