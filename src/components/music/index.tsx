import { useState } from "react";
import ReactPlayer from "react-player"
import useYoutubeControlsContext from "@/hooks/useThisContext";
import YoutubeControlsContext from "@/contexts/musicPlayerContext";

import VolumeControlSlider from "./VolumeContolSlider";
import YoutubeControlButton from "./ControlButton";
import { PauseButtonIcon, PlayButtonIcon } from "@/components/icons";

import styles from "@/styles/music.module.scss";
import useKeyPress from "@/hooks/useKeyPress";

const YoutubeControls = () => {
  const { playing, loading, setPlaying } = useYoutubeControlsContext();

  return <div className={styles.youtube_controller}>
    {
      loading ? <p>Buffering</p> : <>
      <YoutubeControlButton onclick={() => setPlaying(!playing)} dimensions={50} >
        { playing ? <PauseButtonIcon /> : <PlayButtonIcon /> }
      </YoutubeControlButton>

      <VolumeControlSlider />
    </>}
  </div>
}

function MusicComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useKeyPress({
    targetKeys: {
      "Space": () => {setPlaying(prev => !prev)},
      "ArrowRight": () => { setVolume(prev => prev + 0.1 > 1 ? 1 : prev + 0.1) },
      "ArrowLeft": () => { setVolume(prev => prev - 0.1 < 0 ? 0 : prev - 0.1) }
    }
  })

  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url("/smoking.gif")`
        }}

      ></div>

      <YoutubeControlsContext.Provider value={{
        loading,
        playing,
        error,
        volume,
        setVolume,
        setError,
        setLoading,
        setPlaying,
      }}>
        <ReactPlayer
          playing={playing}
          volume={volume}
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
