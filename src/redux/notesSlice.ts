import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getRandomId, NoteI, NotesI } from "@/components/notes/notes";

interface NoteStateI {
  value: {
    notes: NotesI;
  };
}

const initState: NoteStateI = {
  value: {
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
  noteId: string;
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
    },

    setCurrentNote: (state, action: PayloadAction<string>) => {
      const notes: NotesI = JSON.parse(JSON.stringify(state.value.notes));
      console.log(notes);
      if (!(action.payload in notes)) {
        throw Error("No such note exists");
      }
    },

    editNote: (state, action: PayloadAction<EditNoteI>) => {
      const { title, content, noteId } = action.payload;
      const currNote: NoteI = JSON.parse(
        JSON.stringify(state.value.notes[noteId]),
      );

      if (title !== undefined) currNote.title = title;
      if (content !== undefined) currNote.content = content;

      state.value.notes = {
        ...state.value.notes,
        [noteId]: currNote,
      };
    },
  },
});

export const { deleteNote, addNote, setCurrentNote, editNote } =
  notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.value;

export default notesSlice.reducer;
