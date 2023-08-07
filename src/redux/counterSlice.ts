import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CounterStateI {
  value: number;
}

const initState: CounterStateI = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initState,
  reducers: {
    inc: (state) => {
      state.value += 1;
    },
    dec: (state) => {
      state.value += 1;
    },
    incByAmnt: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { inc, dec } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
