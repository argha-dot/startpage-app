import ReactPlayer from "react-player";
import { useEffect, useRef } from "react";

import useKeyPress from "@/hooks/useKeyPress";
import VolumeControlSlider from "./VolumeContolSlider";
import YoutubeControlButton from "./ControlButton";
import { PauseButtonIcon, PlayButtonIcon } from "@/components/icons";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import {
  decreaseVolume,
  hasLoaded,
  increaseVolume,
  selectMusic,
  setPlaying,
  togglePlay,
} from "@/redux/musicSlice";

import styles from "@/styles/music.module.scss";

const YoutubeControls = () => {
  const { playing, loading } = useAppSelector(selectMusic);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.youtube_controller}>
      {loading ? (
        <p>Buffering</p>
      ) : (
        <>
          <YoutubeControlButton
            ariaLabel={playing ? "Pause" : "Play"}
            onclick={() => dispatch(togglePlay())}
            dimensions={50}
          >
            {playing ? <PauseButtonIcon /> : <PlayButtonIcon />}
          </YoutubeControlButton>

          <VolumeControlSlider />
        </>
      )}
    </div>
  );
};

function MusicComponent() {
  const { playing, volume } = useAppSelector(selectMusic);
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement>(null);

  useKeyPress({
    targetKeys: {
      Space: () => {
        dispatch(togglePlay());
      },
      ArrowRight: () => {
        dispatch(increaseVolume());
      },
      ArrowLeft: () => {
        dispatch(decreaseVolume());
      },
    },
  });

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.background} ${playing ? styles.bg_flicker : ""}`}
      >
        <video
          ref={videoRef}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
        >
          <source src="/smoking.webm" type="video/webm" />
          <source src="/smoking.mp4" type="video/mp4" />
        </video>

        <div className={styles.vignette}></div>
      </div>

      <ReactPlayer
        playing={playing}
        volume={volume}
        width={0}
        height={0}
        url={"https://www.youtube.com/watch?v=jfKfPfyJRdk"}
        onPause={() => dispatch(setPlaying(false))}
        onPlay={() => dispatch(setPlaying(true))}
        onReady={() => {
          dispatch(hasLoaded());
        }}
      />

      <YoutubeControls />
    </div>
  );
}

export default MusicComponent;
