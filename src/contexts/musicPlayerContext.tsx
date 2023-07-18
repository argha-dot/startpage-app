import { Dispatch, SetStateAction, createContext } from "react";

interface YoutubePlayerControlsI {
  loading: boolean
  playing: boolean
  error: boolean
  volume: number
  setVolume: Dispatch<SetStateAction<number>>
  setError: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setPlaying: Dispatch<SetStateAction<boolean>>
}

const YoutubeControlsContext = createContext<YoutubePlayerControlsI | null>(null);

export default YoutubeControlsContext;
