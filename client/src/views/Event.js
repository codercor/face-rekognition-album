import React, {
    useState, useEffect, useMemo
} from 'react'
import { Grid, Box, TextField, Button, Container, Typography, Stack } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getEvent,reset } from '../features/eventSlice'
import TakeSelfie from '../components/Event/TakeSelfie'
import Photos from '../components/Event/Photos'


export default function Event() {

    const { event } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(reset())
    }, []);

    useEffect(() => {
        dispatch(getEvent(event))
    }, [event]);

    const eventData = useSelector(state => state.event)

    useEffect(() => {
        console.log("AA EVENT DATA", eventData)
    }, [eventData])



    return (
       eventData.eventName == "" ? <Typography>Loading...</Typography> : <Container
            maxWidth="md"
            sx={{
                background: `url('http://localhost:3000/public/backgrounds/${eventData.eventBackgroud}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    padding: '1rem',
                }}
            >
                <Typography variant="h5" color="white">
                    {eventData.eventName}
                </Typography>
               
                 {eventData.isLoading ? <Typography variant="h2">Loading...</Typography>:(eventData.photos.length < 1 ?  <Stack sx={{
                    width: '300px',
                    height: '300px',
                }} ><TakeSelfie eventName={eventData.eventName} /></Stack>:<Stack
                sx={{
                    width: '100vw',
                    height: '100vh',
                }}
                ><Photos isPaid={eventData.isPaid}  photos={eventData.photos} /></Stack> )}  
                
            </Box>
        </Container>
    )

}