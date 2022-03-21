import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from '../services/admin.service';

export const createEvent = createAsyncThunk(
    "admin/createEvent",
    async (data, { dispatch }) => {
        let { eventName:name, backgroundImage, isPaid } = data;
        return await adminService.createEvent({ name, backgroundImage, isPaid });
    }
);

export const deleteEvent = createAsyncThunk(
    "admin/deleteEvent",
    async (name, { dispatch }) => {
        return await adminService.deleteEvent(name);
    }
);

export const getAllEvents = createAsyncThunk(
    "admin/getAllEvents",
    async (data, { dispatch }) => {
        return await adminService.getAllEvents();
    }
);

export const getEvent = createAsyncThunk(
    "admin/getEvent",
    async (name, { dispatch }) => {
        return await adminService.getEvent(name);
    }
);

export const updateEvent = createAsyncThunk(
    "admin/updateEvent",
    async (data, { dispatch }) => {
        let { name, backgroundImage, isPaid } = data;
        return await adminService.updateEvent(name, { name, backgroundImage, isPaid });
    }
);

export const uploadImage = createAsyncThunk(
    "admin/uploadImage",
    async (data, { dispatch }) => {
        console.log("UPLOAD IMAGE START");
        return await adminService.uploadImage(data);
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        events: [],
        emptyEvent: {
            eventName: "",
            backgroundImage: "",
            isPaid: false
        },
        editItem: {
            eventName: "",
            backgroundImage: "",
            isPaid: false
        },
        newItem: {
            eventName: "",
            backgroundImage: "",
            isPaid: false,
            isOk: false
        },
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
            return state;
        },
        setNewItem: (state, action) => {
            state.newItem = action.payload;
            return state;
        }

    },
    extraReducers: {
        [createEvent.fulfilled]: (state, action) => {
            state.events.push(action.payload);
            state.newItem.isOk = true;
        },
        [deleteEvent.fulfilled]: (state, action) => {
            state.events = state.events.filter(event => event.name !== action.payload);
        },
        [getAllEvents.fulfilled]: (state, action) => {
            state.events = action.payload;
        },
        [getEvent.fulfilled]: (state, action) => {
            state.emptyEvent = action.payload;
        },
        [updateEvent.fulfilled]: (state, action) => {
            let index = state.events.findIndex(event => event.name === action.payload.name);
            state.events[index] = action.payload;
        },
        [uploadImage.fulfilled]: (state, action) => {
           let response = action.payload;
           let fileName = response.data.filename;
           console.log("fileName", fileName);
            state.newItem = {
                ...state.newItem,
                backgroundImage: fileName
            }
        }
    },
});

export const { setEvents,setNewItem } = adminSlice.actions;
export default adminSlice.reducer;
