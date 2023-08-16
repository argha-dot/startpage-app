import type { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KeyPressI {
  value: number;
}

const initState: KeyPressI = {
  value: 0,
};

export const keyPressSlice = createSlice({
  name: "keyPress",
  initialState: initState,
  reducers: {},
});

export const {} = keyPressSlice.actions;
export const selectCount = (state: RootState) => state.keypress.value;

export default keyPressSlice.reducer;
