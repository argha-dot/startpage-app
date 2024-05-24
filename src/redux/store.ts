import { configureStore } from "@reduxjs/toolkit";
import editModeReducer from "./editModeSlice";
import musicReducer from "./musicSlice";
import notesReducer from "./notesSlice";
import keyPressReducer from "./keyPressSlice";
import componentsReducer from "./componentsSlice";
import { loadState } from "@/components/localFuncs";
import { ComponentsKind } from "@/components/component";

const loadedStateNotes = loadState("notes");
const loadedComponents = loadState("components");

const store = configureStore({
  reducer: {
    editMode: editModeReducer,
    music: musicReducer,
    notes: notesReducer,
    keypress: keyPressReducer,
    components: componentsReducer,
  },
  preloadedState: {
    components: {
      value: loadedComponents ?? {
        clock: {
          kind: ComponentsKind.General,
          rowStart: 3,
          colStart: 5,
        },
        note: {
          kind: ComponentsKind.Note,
          rowStart: 5,
          colStart: 10,
          noteId: "05mrx",
        },
        link: {
          kind: ComponentsKind.Link,
          rowStart: 3,
          rowSpan: 2,
          colStart: 4,
          title: "Reddit",
          link: "https://reddit.com",
        },
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
