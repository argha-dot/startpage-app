import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import musicReducer from "./musicSlice";
import notesReducer from "./notesSlice";
import keyPressReducer from "./keyPressSlice";
import { loadState } from "@/components/localFuncs";

const loadedStateNotes = loadState("notes");

const store = configureStore({
  reducer: {
    counter: counterReducer,
    music: musicReducer,
    notes: notesReducer,
    keypress: keyPressReducer,
  },
  preloadedState: {
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
