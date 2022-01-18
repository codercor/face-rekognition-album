import React, { useState } from 'react'
import {
    Typography,
    Checkbox, Box, Button, fabClasses
} from '@mui/material'
export default function Welcome({ setAccept }) {
    const [checked, setChecked] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const checkErrorStyle = {
        boxShadow: '0px 5px 20px .5px rgba(0,0,0,0.75)'
    }
    return (
        <Box
            className="xxx"
            sx={{
                width: '100%',
                height: '100%',
                color: 'white',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'url(https://www.genesishospital.com.tr/wp-content/uploads/2019/12/images-1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    backdropFilter: 'grayscale(50%) blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" color="inherit">
                    Hoşgeldiniz
                </Typography>
                <Button variant="contained" sx={{
                    backgroundColor: '#f50057',
                    '&:hover': {
                        backgroundColor: '#ff0057'
                    },
                    marginTop: '15px'
                }}
                    onClick={() => {
                        if (checked) {
                            setAccept(true)
                        }else{
                            setCheckError(true)
                            setTimeout(() => {
                                setCheckError(false)
                            },2000)
                        }
                    }}
                >
                    Fotoğraflarımı al
                </Button>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: '15px',
                    padding: '0 10px',
                    marginTop: '15px', 
                    boxShadow: checkError ? checkErrorStyle.boxShadow : 'none',
                    transition: 'box-shadow .5s ease-in-out'
                }}>
                    <Checkbox checked={checked} onChange={() => { setChecked(!checked) }} />
                    <Typography variant="overline" color="inherit">
                        Kullanım koşullarını okudum ve kabul ediyorum.
                    </Typography>
                </div>

            </Box>
        </Box>
    )
}
