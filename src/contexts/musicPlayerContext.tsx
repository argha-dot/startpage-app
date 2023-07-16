import { Dispatch, SetStateAction, createContext } from "react";

interface YoutubePlayerControlsI {
  loading: boolean
  playing: boolean
  looping: boolean
  error: boolean
  setError: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setPlaying: Dispatch<SetStateAction<boolean>>
  setLooping: Dispatch<SetStateAction<boolean>>
}

const YoutubeControlsContext = createContext<YoutubePlayerControlsI | null>(null);

export default YoutubeControlsContext;
