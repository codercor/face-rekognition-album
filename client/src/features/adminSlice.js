import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from '../services/admin.service';

export const createEvent = createAsyncThunk(
    "admin/createEvent",
    async (data, { dispatch }) => {
        let { eventName:name, backgroundImage, isPaid } = data;
        await adminService.createEvent({ name, backgroundImage, isPaid });
        dispatch(getAllEvents());
    }
);

export const deleteEvent = createAsyncThunk(
    "admin/deleteEvent",
    async (name, { dispatch }) => {
         await adminService.deleteEvent(name);
         dispatch(getAllEvents());
    }
);

export const getAllEvents = createAsyncThunk(
    "admin/getAllEvents",
    async (data) => {
        console.log("ÇALIŞTI");
        const events =  await adminService.getAllEvents();
        return events;
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
        let { name, backgroundImage, isPaid,id } = data;
        console.log(name, backgroundImage, isPaid,id);
        await adminService.updateEvent({ id,name, backgroundImage, isPaid });
        dispatch(getAllEvents())
    }
);

export const uploadImage = createAsyncThunk(
    "admin/uploadImage",
    async (data, { dispatch }) => {
        console.log("UPLOAD IMAGE START");
        return await adminService.uploadImage(data);
    }
);

export const getSubUsers = createAsyncThunk(
    "admin/getSubUsers",
    async () => {
        return await adminService.getSubUsers();
    }
);

export const deleteSubUser = createAsyncThunk(
    "admin/deleteSubUser",
    async (id, { dispatch }) => {
        await adminService.deleteSubUser(id);
        dispatch(getSubUsers());
    }
);

export const createUser = createAsyncThunk(
    "admin/createUser",
    async (data, { dispatch }) => {
        let { name, username, password, phone } = data;
        await adminService.createUser({ name, username, password, phone });
        dispatch(getSubUsers());
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        events: [],
        subUsers:[],
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
            state.newItem.isOk = true;
        },
        [deleteEvent.fulfilled]: (state, action) => {
            return state;
        },
        [getAllEvents.fulfilled]: (state, action) => {
            state.events = action.payload;
        },
        [getEvent.fulfilled]: (state, action) => {
            state.emptyEvent = action.payload;
        },
        [updateEvent.fulfilled]: (state, action) => {
            return state;
        },
        [uploadImage.fulfilled]: (state, action) => {
           let response = action.payload;
           let fileName = response.data.filename;
           console.log("fileName", fileName);
            state.newItem = {
                ...state.newItem,
                backgroundImage: fileName
            }
        },
        [getSubUsers.fulfilled]: (state, action) => {
            state.subUsers = action.payload;
        }
    },
});

export const { setEvents,setNewItem } = adminSlice.actions;
export default adminSlice.reducer;
