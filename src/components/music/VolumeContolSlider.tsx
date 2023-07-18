import useYoutubeControlsContext from "@/hooks/useThisContext";
import styles from "@/styles/music.module.scss";

const convertVolumeToArr = (volume: number): boolean[] => {
  const vol = Number( volume.toFixed(1) ) * 10
  let retArr = []

  for (let i = 0; i < 10; i++) {
    if (i + 1 <= vol) {
      retArr.push(true)

      continue;
    }
    retArr.push(false);
  }

  return retArr
}

const VolumeControlSlider = () => {
  const { volume, setVolume } = useYoutubeControlsContext()

  return (
    <div className={styles.yt_volume_control}>
      {
        convertVolumeToArr(volume).map((v, i) => {
          return <div key={i} onClick={() => { setVolume(( i + 1 ) / 10) }}>
            <div className={v ? styles.volume_here : styles.not_here}></div>
          </div>
        })
      }
    </div>
  )
}

export default VolumeControlSlider;
