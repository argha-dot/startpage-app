import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import psuedoFSReducer from "./psuedoFSSlice";
import musicReducer from "./musicSlice";
import notesReducer from "./notesSlice";
import keyPressReducer from "./keyPressSlice";
import PsuedoFS from "@/components/bookmarks/psuedo_fs";
import { loadState } from "@/components/localFuncs";

const loadedStatePsuedoFS = loadState("psuedo_fs");
const loadedStateNotes = loadState("notes");

const store = configureStore({
  reducer: {
    counter: counterReducer,
    psuedoFS: psuedoFSReducer,
    music: musicReducer,
    notes: notesReducer,
    keypress: keyPressReducer,
  },
  preloadedState: {
    psuedoFS: {
      value: {
        currentPath: "",
        psuedoFS: new PsuedoFS(loadedStatePsuedoFS ? loadedStatePsuedoFS : {}),
      },
    },
    notes: {
      value: loadedStateNotes ?? {
        currentNote: "defaultNote",
        notes: {
          defaultNote: {
            title: "",
            content: "",
          },
        },
      },
    },
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
