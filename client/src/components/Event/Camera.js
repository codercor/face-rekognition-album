import { Box } from '@mui/material'
import React,{useEffect,useState} from 'react'

export default function Camera() {
    
    return (
        <div style={{
            overflow: 'auto',
        }}>
            <video height="140px" width="100%" autoPlay>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" muted type="video/mp4" />
            </video>
        </div >
    )
}
