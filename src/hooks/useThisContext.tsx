import YoutubeControlsContext from "@/contexts/musicPlayerContext";
import PsuedoFSStateContext from "@/contexts/psuedoFSContext";
import { Context, useContext } from "react";


const useThisContext = <T,>(thisContext: Context<T>) => {
  const context = useContext(thisContext);

  if (!context) {
    throw new Error("no provider provided")
  }

  return context
}


const usePsuedoFSContext = () => useThisContext(PsuedoFSStateContext)
const useYoutubeControlsContext = () => useThisContext(YoutubeControlsContext);

export {
  useYoutubeControlsContext,
  usePsuedoFSContext,
  useThisContext,
};
