import { PropsWithChildren } from "react";
import styles from "@/styles/music.module.scss";

type YoutubeControlButtonProps = {
  onclick: () => void;
  classname?: string;
  dimensions: number;
  ariaLabel: string;
};

const YoutubeControlButton = ({
  classname,
  ariaLabel,
  onclick,
  children,
}: PropsWithChildren<YoutubeControlButtonProps>) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`${styles.play_pause_button} ${classname}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default YoutubeControlButton;
