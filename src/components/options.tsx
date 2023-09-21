import styles from "@/styles/options.module.scss";
import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

const OptionsComponent = () => {
  return (
    <div className={styles.container}>
      <Link to="/games">
        <FaGamepad />
      </Link>
    </div>
  );
};

export default OptionsComponent;
