import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { theAudioDbApi } from './services/theAudioDb';

export const store = configureStore({
  reducer: {
    [theAudioDbApi.reducerPath]: theAudioDbApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(theAudioDbApi.middleware),
});
