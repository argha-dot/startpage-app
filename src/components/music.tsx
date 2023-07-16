import styles from "@/styles/music.module.scss";
import { PropsWithChildren } from "react";
import { PauseButtonIcon, PlayButtonIcon } from "@/components/icons";

type YoutubeControlButtonProps = {
  onclick: () => void,
  classname?: string,
  dimensions: number
}

const YoutubeControlButton = ({
  dimensions,
  classname,
  onclick,
  children}: PropsWithChildren<YoutubeControlButtonProps>
) => {
  return <button
    className={`${styles.play_pause_button} ${classname}`}
    style={{
      width: dimensions,
      height: dimensions,
    }}
    onClick={onclick}>{children}
  </button>
}

const YoutubeControls = () => {
  return <div className={styles.youtube_controller}>
    <YoutubeControlButton onclick={() => {}} dimensions={50} >
      { true ? <PauseButtonIcon /> : <PlayButtonIcon /> }
    </YoutubeControlButton>
  </div>
}

function MusicComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <YoutubeControls />
    </div>
  );
}

export default MusicComponent;
