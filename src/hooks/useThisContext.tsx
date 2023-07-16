import YoutubeControlsContext from "@/contexts/musicPlayerContext";
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

export default useYoutubeControlsContext;
