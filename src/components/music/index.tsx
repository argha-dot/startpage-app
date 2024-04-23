import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ReactPlayer = lazy(() => import("react-player"));

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
import { createPortal } from "react-dom";
import Container, { ComponentContianerPropsI } from "../container";

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
        </>
      )}
    </div>
  );
};

export type MusicComponentPropsI = ComponentContianerPropsI;

const MusicComponent = ({
  rowStart,
  rowSpan,
  colStart,
  colSpan,
}: Partial<ComponentContianerPropsI>) => {
  const { playing, volume } = useAppSelector(selectMusic);
  const dispatch = useAppDispatch();

  const [showVolume, setShowVolume] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useKeyPress({
    targetKeys: {
      Space: {
        callback: () => {
          dispatch(togglePlay());
        },
      },
      ArrowRight: {
        callback: () => {
          setShowVolume(true);
          dispatch(increaseVolume());
        },
      },
      ArrowLeft: {
        callback: () => {
          setShowVolume(true);
          dispatch(decreaseVolume());
        },
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolume(false);
    }, 2_000);

    return () => clearTimeout(timer);
  }, [showVolume]);

  return (
    <Container
      padding="0.5rem 0.5rem"
      colStart={colStart ?? 1}
      rowStart={rowStart ?? 1}
      rowSpan={rowSpan ?? 1}
      colSpan={colSpan ?? 1}
      minRow={1}
      minCol={2}
      className={styles.container}
    >
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

      <Suspense fallback={<>loading</>}>
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
      </Suspense>

      <YoutubeControls />
      {createPortal(
        <div
          className={`${showVolume ? styles.show_volume : styles.hide_volume} ${styles.yt_volume_container}`}
        >
          <VolumeControlSlider />
        </div>,
        document.body,
      )}
    </Container>
  );
};

export default MusicComponent;
