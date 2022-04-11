import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import eventSlice from '../features/eventSlice';
import userSlice from '../features/userSlice';
import adminSlice from '../features/adminSlice';
import uploaderSlice from '../features/uploaderSlice';

const reducers = combineReducers({
  event: eventSlice,
  user: userSlice,
  admin: adminSlice,
  uploader: uploaderSlice,
});


const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: ['user']
}, reducers);


const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});



export default store;
