import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { search, getEvent as getEventService } from "../services/event.service";

const initialState = {
  eventName: "",
  isLoading: false,
  isLoadingPhotos: false,
  eventBackgroud: "",
  error: null,
  photos: [],
  isPaid: true,
  selfie: "",
  selectedPhotos: [],
};

export const searchFace = createAsyncThunk("event/searchFace", async (data) => {
  //send form data to server with image
  return await search(data);
});

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (data, { dispatch, rejectWithValue }) => {
    let event;
    try {
      event = await getEventService(data);
      console.log("get event data ->", event);
    } catch (error) {
      console.log("ERROR get event data ->", error);
      return rejectWithValue(error);
    }
    return event;
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
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
        photos: [],
        isPaid: true,
        selfie: "",
        selectedPhotos: [],
      };
      return state;
    },
    selectPhoto: (state, action) => {
      if (state.selectedPhotos.includes(action.payload)) {
        state.selectedPhotos = state.selectedPhotos.filter(
          (photo) => photo !== action.payload
        );
      }else{
        state.selectedPhotos.push(action.payload);
      }
    },
    clearSelectedPhotos: (state, action) => {
      state.selectedPhotos = [];
    },
  },
  extraReducers: {
    [getEvent.pending]: (state, action) => {
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
      console.log("REJECTED");
      state.isLoading = false;
      state.error = "Event bulunamadı";
      //reducer içinden router'a erişip yönlendirme yapılabilir.
    },
    [searchFace.pending]: (state, action) => {
      console.log("pending");
      state.isLoading = true;
    },
    [searchFace.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("PHOTOS", action.payload);
      state.photos = action.payload.data;
      console.log(state.photos);
    },
  },
});

export const {
  setSelfie,
  reset,
  selectPhoto,
  unselectPhoto,
  clearSelectedPhotos,
} = eventSlice.actions;
export default eventSlice.reducer;
