import styles from "@/styles/options.module.scss";
import { FiSettings } from "react-icons/fi";

const OptionsComponent = () => {
  return <div className={styles.container}>
    <a href="about:preferences" target="_blank">
      <FiSettings />
    </a>
  </div>
}

export default OptionsComponent;
