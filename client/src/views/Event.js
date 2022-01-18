import {
    Container, Stack, Box, Typography, Button, Grid
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import BgImage from '../assets/home-bg.svg'
import { useParams } from 'react-router-dom'
import Welcome from '../components/Event/Welcome'
import TakeSelfie from '../components/Event/TakeSelfie'
export default function Event() {
    const { event: eventParameter } = useParams()
    const [accept, setAccept] = useState(true)
    useEffect(() => {
        console.log(eventParameter)
    }, [])
    return (
        <>
            {!accept && <Welcome setAccept={setAccept} />}
            <Container maxWidth="lg" sx={{
                background: `url('${BgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '50vh',
                width: '100%',
                
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                <TakeSelfie />
                </div>
            </Container></>
    )
}
