import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { search, getEvent as getEventService } from '../services/event.service';

export const searchFace = createAsyncThunk("event/searchFace", async (data) => {
    //send form data to server with image
    return await search(data);
});


export const getEvent = createAsyncThunk("event/getEvent", async (data,{dispatch}) => {
    return await getEventService(data);
});

export const eventSlice = createSlice({
    name: "event",
    initialState: {
        eventName: "",
        isLoading: false,
        eventBackgroud: "",
        error: null,
        photos:[],
        isPaid:true,
        selfie:""
    },
    reducers: {
        setSelfie: (state, action) => {
            state.selfie = action.payload;
        },
        reset: (state, action) => {
            state = {
                eventName: "",
                isLoading: false,
                eventBackgroud: "",
                error: null,
                photos:[],
                isPaid:true,
                selfie:""
            }
        }
    },
    extraReducers: {
        [getEvent.pending]: (state, action) => {
            console.log("pending");
            state.isLoading = true;
        },
        [getEvent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.eventName = action.payload.data.name;
            state.eventBackgroud = action.payload.data.backgroundImage;
            state.isPaid = action.payload.data.isPaid;
            console.log(state.eventName, state.eventBackgroud, state.isPaid);

        },
        [getEvent.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [searchFace.pending]: (state, action) => {
            console.log("pending");
            state.isLoading = true;
        },
        [searchFace.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log("PHOTOS",action.payload);
            state.photos = action.payload.data;
            console.log(state.photos);
        },
    }
});

export const { setSelfie,reset } = eventSlice.actions;
export default eventSlice.reducer;
