import { Grid, List, ListItem, ListItemButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

const EventItem = ({ eventName }) => <ListItem

    sx={{
        backgroundColor: "#bdd4e7",
        backgroundImage: "linear-gradient(315deg,  #bdd4e7 0%, #8693ab 74%)",
        color: "white",
        fontFamily: "sans-serif",
        fonstWeight: "bold",
        margin: "0.5rem",
    }}

>
    <Typography variant="caption">
        {eventName}
    </Typography>
    <ListItemButton
        sx={{
            border: '1px solid #bdd4e7',
            backgroundColor: "#eec0c6",
            backgroundImage: "linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%)"

        }}
    >
        Select
    </ListItemButton>
</ListItem>

export default function Home() {
    const [events, setEvents] = useState([
        {
            eventName: 'Ahmet ile ayşe düğün',
        },
        {
            eventName: 'selami sünnet düğün',
        },
        {
            eventName: 'Ahmet ile ayşe düğün',
        },
        {
            eventName: 'selami sünnet düğün',
        },
        {
            eventName: 'Ahmet ile ayşe düğün',
        },
        {
            eventName: 'selami sünnet düğün',
        },
        {
            eventName: 'Ahmet ile ayşe düğün',
        },
        {
            eventName: 'selami sünnet düğün',
        },
    ]);
    return (
        <div>
            <Grid container sx={{ display: 'flex' }} spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Box
                        sx={{
                            background: 'rgba(255,255,255,0.8)',
                            width: '100%',
                            height: '40vh',
                        }}
                    >
                        <TextField fullWidth label="Search"
                        
                        
                        />
                        <List
                            sx={{
                                
                            overflowX: 'hidden',
                            overflowY: 'scroll',
                            height: '100%',
                            }}
                        >
                            {events.map((event, index) => <EventItem key={event.eventName} eventName={event.eventName} />)}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
