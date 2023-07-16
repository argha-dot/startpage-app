import styles from "@/styles/dateTime.module.scss";
import DateTimeComponent from "./dateTime";
import WeatherComponent from "./weather";

const GeneralStatusComponent = () => {
  return (
    <div className={styles.container}>
      <DateTimeComponent />
      <WeatherComponent />
    </div>
  );
};


export default GeneralStatusComponent;
