import styles from "@/styles/music.module.scss";
import ReactPlayer from "react-player"
import { useState } from "react";
import { PauseButtonIcon, PlayButtonIcon } from "@/components/icons";
import YoutubeControlButton from "./ControlButton";
import YoutubeControlsContext from "@/contexts/musicPlayerContext";
import useYoutubeControlsContext from "@/hooks/useThisContext";


const YoutubeControls = () => {
  const { playing, setPlaying } = useYoutubeControlsContext();

  return <div className={styles.youtube_controller}>
    <YoutubeControlButton onclick={() => setPlaying(!playing)} dimensions={50} >
      { playing ? <PauseButtonIcon /> : <PlayButtonIcon /> }
    </YoutubeControlButton>
  </div>
}

function MusicComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <YoutubeControlsContext.Provider value={{
        loading,
        playing,
        error,
        setError,
        setLoading,
        setPlaying,
      }}>
        <ReactPlayer
          playing={playing}
          width={0} height={0}
          url={ 'https://www.youtube.com/watch?v=jfKfPfyJRdk' }
          onReady={() => setLoading(false)}
        />

        <YoutubeControls />
      </YoutubeControlsContext.Provider>
    </div>
  );
}

export default MusicComponent;
