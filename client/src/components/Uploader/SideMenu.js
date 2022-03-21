import React from 'react'
import { List, ListItem, ListItemButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Home as HomeIcon, ExitToApp } from '@mui/icons-material'

function MenuItem({ title, icon, to }) {
    const navigate = useNavigate()
    return (
        <ListItem
        sx={{
            width:"20%"
        }}
        >
            <ListItemButton
                sx={{
                    backgroundColor: 'rgb(88,200,120,0.8)',
                    color: 'white',
                    display: 'flex',
                    fontFamily: 'monospace',
                    '&:hover': {
                        backgroundColor: 'rgb(88,200,120,1)',
                        color: 'white',
                    }
                }}
                onClick={() => {
                    navigate(to)
                }}>
                {icon}
                <h2> {title} </h2>
            </ListItemButton>
        </ListItem>
    )
}
const menuList = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        to: '/uploader/',
        key: 'home'
    },
    {
        title: 'Exit',
        icon: <ExitToApp />,
        to: '/exit/',
        key: 'exit'
    },
]
export default function SideMenu() {
    return (
        <List
            sx={{
                display: 'flex',
            }}
        >
            {
                menuList.map(item => {
                    return <MenuItem  {...item} />
                })
            }
        </List>
    )
}
