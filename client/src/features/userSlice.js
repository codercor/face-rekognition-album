import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/user.service';

import {
    Location
} from 'react-router-dom';

export const login = createAsyncThunk("user/login", async (data) => {
    let {username, password} = data;
    return await userService.login({username, password});
});
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user:{},
        token:"",
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            console.log("DATA " , action.payload);
            localStorage.setItem("token", action.payload.token);
        },
        [login.rejected]: (state, action) => {
            state.user = {};
            state.token = "";
            localStorage.removeItem("token");
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
