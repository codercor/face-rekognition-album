import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadSelectedPhotos as uploadSelectedPhotosService,fetchAvailableEvents as fetchAvailableEventsService } from "../services/uploader.service";

export const uploadSelectedPhotos = createAsyncThunk("uploader/uploadSelectedPhotos",({photos,folder}) => {
  return uploadSelectedPhotosService(photos, folder);
});
export const fetchAvailableEvents = createAsyncThunk("uploader/fetchAvailableEvents",() => {
  return fetchAvailableEventsService();
});

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
      state.uploadedPhotos = action.payload.data
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
    }

  },
});

export const { setSelectedPhotos ,setSelectedEvent} = uploaderSlice.actions;
export default uploaderSlice.reducer;
