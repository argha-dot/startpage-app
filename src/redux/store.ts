import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"
import psuedoFSReducer from "./psuedoFSSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    psuedoFS: psuedoFSReducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
