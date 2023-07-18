import { PropsWithChildren } from "react";
import styles from "@/styles/music.module.scss";


type YoutubeControlButtonProps = {
  onclick: () => void,
  classname?: string,
  dimensions: number
}

const YoutubeControlButton = ({
  classname,
  onclick,
  children}: PropsWithChildren<YoutubeControlButtonProps>
) => {
  return <button
    className={`${styles.play_pause_button} ${classname}`}
    onClick={onclick}>{children}
  </button>
}

export default YoutubeControlButton
