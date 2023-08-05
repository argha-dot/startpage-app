import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"
import psuedoFSReducer, { loadState } from "./psuedoFSSlice"
import musicReducer from "./musicSlice"
import PsuedoFS from "@/components/bookmarks/psuedo_fs";

const loadedState = loadState()

const store = configureStore({
  reducer: {
    counter: counterReducer,
    psuedoFS: psuedoFSReducer,
    music: musicReducer
  },
  preloadedState: {
    psuedoFS: {
      value: {
        currentPath: "",
        psuedoFS: new PsuedoFS(loadedState ? loadedState : {})
      }
    }
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
