import styles from "@/styles/options.module.scss";
import { Link } from "react-router-dom";
import { FaGamepad, FaVolumeOff } from "react-icons/fa";
import { selectMusic } from "@/redux/musicSlice";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import Container from "./container";

const OptionsComponent = () => {
  const { playing } = useAppSelector(selectMusic);

  return (
    <Container
      absCol={1}
      absRow={1}
      padding="10px"
      colStart={12}
      className={styles.container}
    >
      <Link
        target={playing ? "_blank" : "_top"}
        className={styles.option}
        to="/games"
      >
        <FaGamepad />
      </Link>

      <div className={styles.option}>
        <FaVolumeOff />
      </div>
    </Container>
  );
};

export default OptionsComponent;
