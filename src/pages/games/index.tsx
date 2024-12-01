import { Link } from "react-router-dom";
import styles from "@/styles/gamePage.module.scss";

const GamesPage = () => {
  return (
    <div className={styles.main_container}>
      <style>
        {`
          .some {
            background: 
              linear-gradient(
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0)
              ),
              url(/flap.png);
          }
          
          .some:hover {
            background: 
              linear-gradient(
                rgba(0, 0, 0, 0.75),
                rgba(0, 0, 0, 0.75)
              ),
              url(/flap.png);
          }
        `}
      </style>
      <Link
        to="/games/flappy"
        className={`${styles.game_cover} some`}
      >
        Flappy
      </Link>

      <Link
        to="/games/lineoff"
        className={styles.game_cover}
      >
        Line Off
      </Link>

      <Link
        to="/games/2048"
        className={styles.game_cover}
      >
        2048
      </Link>
    </div>
  );
};

export default GamesPage;
