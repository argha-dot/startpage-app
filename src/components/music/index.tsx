import ReactPlayer from "react-player"

import useKeyPress from "@/hooks/useKeyPress";
import VolumeControlSlider from "./VolumeContolSlider";
import YoutubeControlButton from "./ControlButton";
import { PauseButtonIcon, PlayButtonIcon } from "@/components/icons";

import styles from "@/styles/music.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { decreaseVolume, hasLoaded, increaseVolume, selectMusic, togglePlay } from "@/redux/musicSlice";

const YoutubeControls = () => {
  const { playing, loading } = useAppSelector(selectMusic)
  const dispatch = useAppDispatch()

  return <div className={styles.youtube_controller}>
    {
      loading ? <p>Buffering</p> : <>
      <YoutubeControlButton onclick={() => dispatch(togglePlay())} dimensions={50} >
        { playing ? <PauseButtonIcon /> : <PlayButtonIcon /> }
      </YoutubeControlButton>

      <VolumeControlSlider />
    </>}
  </div>
}

function MusicComponent() {
  const { playing, volume } = useAppSelector(selectMusic)
  const dispatch = useAppDispatch()

  useKeyPress({
    targetKeys: {
      "Space": () => {dispatch(togglePlay())},
      "ArrowRight": () => {dispatch(increaseVolume())},
      "ArrowLeft": () => {dispatch(decreaseVolume())}
    }
  })

  return (
    <div className={styles.container}>
      <div
        className={`${ styles.background } ${ playing ? styles.bg_flicker : "" }`}
        style={{
          backgroundImage: `url("/smoking.gif")`
        }}
      ></div>

      <ReactPlayer
        playing={playing}
        volume={volume}
        width={0} height={0}
        url={ 'https://www.youtube.com/watch?v=jfKfPfyJRdk' }
        onReady={() => {dispatch(hasLoaded())}}
      />

      <YoutubeControls />
    </div>
  );
}

export default MusicComponent;
