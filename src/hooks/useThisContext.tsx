import YoutubeControlsContext from "@/contexts/musicPlayerContext";
import PsuedoFSStateContext from "@/contexts/psuedoFSContext";
import { useContext } from "react";

const useYoutubeControlsContext = () => {
  const context = useContext(YoutubeControlsContext);

  if (!context) {
    throw new Error(
      "no provider provided"
    )
  }

  return context
}

const usePsuedoFSContext = () => {
  const context = useContext(PsuedoFSStateContext);

  if (!context) {
    throw new Error("no provider provided")
  }

  return context
}

export {
  useYoutubeControlsContext,
  usePsuedoFSContext,
};
