import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getRandomId, NoteI, NotesI } from "@/components/notes/notes";

interface NoteStateI {
  value: {
    currentNote: string;
    notes: NotesI;
  };
}

const initState: NoteStateI = {
  value: {
    currentNote: "defaultNote",
    notes: {
      defaultNote: {
        title: "",
        content: "",
      },
    },
  },
};

interface EditNoteI {
  title?: string;
  content?: string;
}

export const notesSlice = createSlice({
  name: "notes",
  initialState: initState,
  reducers: {
    deleteNote: (state, action: PayloadAction<string>) => {
      const note = action.payload;
      const newNotes = state.value.notes;
      if (!(note in newNotes)) {
        throw Error("No such note exists");
      }

      if (newNotes[note].title === "defaultNote") return;

      delete newNotes[action.payload];
      state.value.notes = JSON.parse(JSON.stringify(newNotes));
    },

    addNote: (state) => {
      const id = getRandomId();
      state.value.notes = {
        ...state.value.notes,
        [id]: {
          title: "",
          content: "",
        },
      };

      state.value.currentNote = id;
    },

    setCurrentNote: (state, action: PayloadAction<string>) => {
      if (!(action.payload in state.value.notes)) {
        throw Error("No such note exists");
      }
      state.value.currentNote = action.payload;
    },

    editNote: (state, action: PayloadAction<EditNoteI>) => {
      const { title, content } = action.payload;
      const currNote: NoteI = JSON.parse(
        JSON.stringify(state.value.notes[state.value.currentNote])
      );

      if (title !== undefined) currNote.title = title;
      if (content !== undefined) currNote.content = content;

      state.value.notes = {
        ...state.value.notes,
        [state.value.currentNote]: currNote,
      };

      console.log(state.value.currentNote);
    },
  },
});

export function loadStateNotes() {
  try {
    const data = localStorage.getItem("psuedo_fs");
    if (!data) return undefined;

    return JSON.parse(data);
  } catch (error) {
    return undefined;
  }
}

export const { deleteNote, addNote, setCurrentNote, editNote } =
  notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.value;

export default notesSlice.reducer;
