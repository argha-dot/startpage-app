import WeatherComponent from "./weather";
import DateTimeComponent from "./dateTime";
import Container, { ComponentContianerPropsI } from "../container";
import styles from "@/styles/dateTime.module.scss";

export type GeneralStatusComponentProps = ComponentContianerPropsI;

const GeneralStatusComponent = ({
  rowStart,
  rowSpan,
  colStart,
  colSpan,
}: Partial<ComponentContianerPropsI>) => {
  return (
    <Container
      minRow={2}
      minCol={4}
      colStart={colStart ?? 1}
      rowStart={rowStart ?? 1}
      rowSpan={colSpan ?? 1}
      colSpan={rowSpan ?? 1}
      className={styles.container}
      padding="15px 35px"
    >
      <DateTimeComponent />
      <WeatherComponent />
    </Container>
  );
};

export default GeneralStatusComponent;
