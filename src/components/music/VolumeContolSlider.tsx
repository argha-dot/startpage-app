import { selectMusic, setVolume } from "@/redux/musicSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";

import styles from "@/styles/music.module.scss";

const convertVolumeToArr = (volume: number): boolean[] => {
  const vol = Number(volume.toFixed(1)) * 10;
  let retArr = [];

  for (let i = 0; i < 10; i++) {
    if (i + 1 <= vol) {
      retArr.push(true);

      continue;
    }
    retArr.push(false);
  }

  return retArr;
};

const VolumeControlSlider = () => {
  const { volume } = useAppSelector(selectMusic);
  const dispatch = useAppDispatch();

  const handleClick = (vol: number) => {
    dispatch(setVolume(vol));
  };

  return (
    <div className={styles.yt_volume_control}>
      {convertVolumeToArr(volume).map((v, i) => {
        return (
          <button
            aria-label={`Volume ${i + 1}`}
            key={i}
            onClick={() => {
              handleClick((i + 1) / 10);
            }}
          >
            <div className={v ? styles.volume_here : styles.not_here}></div>
          </button>
        );
      })}
    </div>
  );
};

export default VolumeControlSlider;
