import { configureStore } from "@reduxjs/toolkit";
import closeOptReducer from "./closeSlice";
export const store = configureStore({
  reducer: {
    closeOpt: closeOptReducer,
  },
});
