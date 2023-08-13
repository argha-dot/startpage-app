import WeatherComponent from "./weather";
import DateTimeComponent from "./dateTime";
import styles from "@/styles/dateTime.module.scss";

const GeneralStatusComponent = () => {
  return (
    <div className={styles.container}>
      <DateTimeComponent />
      <WeatherComponent />
    </div>
  );
};

export default GeneralStatusComponent;
