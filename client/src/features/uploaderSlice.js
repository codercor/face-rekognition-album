import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  uploadSelectedPhotos as uploadSelectedPhotosService,
  fetchAvailableEvents as fetchAvailableEventsService,
  getUploadedPhotos as fetchEventPhotosService } from "../services/uploader.service";

export const uploadSelectedPhotos = createAsyncThunk("uploader/uploadSelectedPhotos",async ({photos,folder},{dispatch}) => {
  let result = await uploadSelectedPhotosService(photos, folder);
  dispatch(getUploadedPhotos(folder));
  return result;
});

export const fetchAvailableEvents = createAsyncThunk("uploader/fetchAvailableEvents",() => {
  return fetchAvailableEventsService();
});

export const getUploadedPhotos = createAsyncThunk("uploader/getEventPhotos",async (eventName) => {
  console.log("eventName", eventName);
  const eventPhotos = await fetchEventPhotosService(eventName);
  console.log("eventPhotos", eventPhotos);
  return eventPhotos;
})

const initialState = {
  selectedEvent: "",
  availableEvents: [],
  isLoading: false,
  error: null,
  isLoadingPhotosUpload: false,
  selectedPhotos: [],
  uploadedPhotos: [],
  statusOfPhotos: [],
  owner: [],
};

export const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    setSelectedPhotos: (state, action) => {
      state.selectedPhotos = action.payload;
      return state;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      return state;
    }
  },
  extraReducers: {
    [uploadSelectedPhotos.pending]: (state, action) => {
      state.isLoadingPhotosUpload = true;
    },
    [uploadSelectedPhotos.fulfilled]: (state, action) => {
      state.isLoadingPhotosUpload = false;
      //action.payload.data=action.payload.data.map(item=>item.split("/")[1]);
    },
    [uploadSelectedPhotos.rejected]: (state, action) => {
      state.isLoadingPhotosUpload = false;
      state.error = "Upload hatası";
    },
    [fetchAvailableEvents.pending]: (state, action) => {
      state.isLoading = true;
      console.log("Uygun eventler yükleniyor...");
    },
    [fetchAvailableEvents.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("Uygun eventler yüklendi.",action.payload);
      state.availableEvents = action.payload.data;
    },
    [fetchAvailableEvents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Uygun eventler yüklenemedi";
    },
    [getUploadedPhotos.fulfilled]: (state, action) => {
      console.log("Fotoğraflar yüklendi.",action.payload.data);
      state.uploadedPhotos = action.payload.data;
    }

  },
});

export const { setSelectedPhotos ,setSelectedEvent} = uploaderSlice.actions;
export default uploaderSlice.reducer;
