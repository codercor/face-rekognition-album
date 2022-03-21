import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { Event, Person } from '@mui/icons-material'
import { Box } from '@mui/system';
import React from 'react';
//read path from react-router-dom
import { 
    useLocation
 } from 'react-router-dom'


import { useNavigate } from 'react-router-dom'

const menu = [
    {
        title: 'Events',
        to: '/admin/',
        icon: <Event />,
    },
    {
        title: 'Users',
        to: '/admin/users',
        icon: <Person />,
    }
]

const Item = ({ title, to, icon, isActive }) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <ListItem sx={
        {
            width: '100%',
            backgroundColor: isActive ? 'rgba(225, 52, 235,0.4)' : 'rgb(227, 225, 226)',
            '&:hover': {
                backgroundColor: 'rgba(225, 52, 235,0.4)',
            },
            borderBottom: '1px solid rgba(255,255,255,0.4)'
        }
    }>
        <ListItemButton  
            onClick={() => {
                navigate(to)
            }}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <Typography variant='caption' >{title}</Typography>
        </ListItemButton>
    </ListItem>
}

export default function SideBar() {
    return <Box>
        <List >
            {menu.map(item => <Item {...item} key={item.title} />)}
        </List>
    </Box>;
}
