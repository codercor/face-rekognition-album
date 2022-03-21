import { Container,Grid,Typography,Box } from '@mui/material'
import React from 'react'

export default function Photos({photos,isPaid}) {
  return (
    <Container maxWidth="md" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    }}>
        
            {photos.map((photo,index) => {
                return (
                    <Box item xs={5.5}  sm={5.5} md={3.5} key={index}
                        sx={{
                            borderRadius: '5px',
                            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                            height: '10rem',
                            backdropFilter: 'aspace(0.5)',
                            background: 'radial-gradient(circle, rgba(100,50,0,0.5) 0%, rgba(0,0,50,0.5) 100%)',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40%',
                            padding: '.4rem',
                        }}
                    >
                        <img 
                            style={{
                                height: '100%',
                                width: '100%',
                                aspectRatio: 'auto',
                                objectFit: 'scale-down'
                            }}
                        src={`https://face-album-bucket.s3.amazonaws.com/${photo}`} alt=""/>
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            background: 'rgba(0,0,0,0.5)',
                            height: '100px',
                        }}>
                            <Typography variant="h6" color="white">
                                {isPaid ? "Paid" : "Free"}
                            </Typography>
                        </div>
                    </Box>
                )
            })}
    </Container>
  )
}
