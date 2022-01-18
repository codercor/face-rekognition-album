import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { search } from '../services/event.service';

export const searchFace = createAsyncThunk("event/searchFace", async (data) => {
    //send form data to server with image
    search(data);
});

export const eventSlice = createSlice({
    name: "event",
    initialState: {
        eventName: "",
        isLoading: false,
        eventBackgroud: "",
        error: null,
        photos:[],
        selfie:""
    },
    reducers: {
        setEvent: (state, action) => {
            state.event = action.payload;
        },
        setSelfie: (state, action) => {
            state.selfie = action.payload;
        }
    }
});

export const { setEvent,setSelfie } = eventSlice.actions;
export default eventSlice.reducer;
