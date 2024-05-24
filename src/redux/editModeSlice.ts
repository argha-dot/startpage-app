import type { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditModeState {
  value: boolean;
}

const initState: EditModeState = {
  value: false,
};

export const editModeSlice = createSlice({
  name: "editMode",
  initialState: initState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    set: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggle, set } = editModeSlice.actions;
export const selectEditMode = (state: RootState) => state.editMode.value;

export default editModeSlice.reducer;
