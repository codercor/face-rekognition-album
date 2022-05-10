import { Button, Grid, styled, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/adminSlice';

const StyledTextField = styled(TextField)`
    && {
       background-color: #fafafa;
       border-radius: 5px;
    }
`;
export default function UserForm() {
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
        name: '',
        username: '',
        password: '',
        phone: '',
    });
    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleClick=()=>{
        dispatch(createUser(user));
        setUser({
            name: '',
            username: '',
            password: '',
            phone: '',
        })
    }
  return (
    <Grid container  spacing={3}>
        <Grid item xs={2.4}>
            <StyledTextField value={user.name} fullWidth label="Name" variant="filled" name="name" onChange={handleChange} />
        </Grid>
        <Grid item xs={2.4}>
            <StyledTextField value={user.username} fullWidth label="Username" variant="filled" name="username" onChange={handleChange} />
        </Grid>
        <Grid item xs={2.4}>
            <StyledTextField value={user.password} fullWidth label="Password" variant="filled" name="password" onChange={handleChange} />
        </Grid>
        <Grid item xs={2.4}>
            <StyledTextField value={user.phone}  fullWidth label="Phone" variant="filled" name="phone" onChange={handleChange} />
        </Grid>
        <Grid item xs={2.4}>
            <Button onClick={handleClick} fullWidth variant="contained" color="secondary">
                Add
            </Button>
        </Grid>
    </Grid>
  )
}
