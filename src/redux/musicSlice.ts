import type { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicStateI {
  value: {
    loading: boolean;
    playing: boolean;
    error: boolean;
    volume: number;
  };
}

const initState: MusicStateI = {
  value: {
    loading: true,
    playing: false,
    error: false,
    volume: 0.7,
  },
};

export const musicSlice = createSlice({
  name: "music",
  initialState: initState,
  reducers: {
    increaseVolume: (state) => {
      const prev = state.value.volume;
      state.value.volume = prev + 0.1 > 1 ? 1 : prev + 0.1;
    },
    decreaseVolume: (state) => {
      const prev = state.value.volume;
      state.value.volume = prev - 0.1 < 0 ? 0 : prev - 0.1;
    },
    hasLoaded: (state) => {
      state.value.loading = false;
    },
    togglePlay: (state) => {
      state.value.playing = !state.value.playing;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.value.playing = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.value.volume = action.payload;
    },
  },
});

export const {
  increaseVolume,
  decreaseVolume,
  hasLoaded,
  togglePlay,
  setVolume,
  setPlaying,
} = musicSlice.actions;
export const selectMusic = (state: RootState) => state.music.value;

export default musicSlice.reducer;
