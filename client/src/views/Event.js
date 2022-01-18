import { Box, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import BgImage from '../assets/home-bg.svg'
import { useParams } from 'react-router-dom'
export default function Event() {
    const { event } = useParams()
    useEffect(() => {
        console.log(event)
    }, [])
    return (
        <Container maxWidth="lg" sx={{
            background: `url('${BgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '80vh'
        }}>
            <Stack >
                <Box

                >
                    <Typography variant="h4" color="textPrimary">
                        Etkinliğe Hoşgeldiniz
                    </Typography>
                    <img style={{
                        width: '70vw',
                    }} src="https://www.genesishospital.com.tr/wp-content/uploads/2019/12/images-1.jpg" />
                </Box>

            </Stack>
        </Container>
    )
}
