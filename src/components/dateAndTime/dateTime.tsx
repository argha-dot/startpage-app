import useGetDate from "@/hooks/useGetDate";
import styles from "@/styles/dateTime.module.scss";

const FancySmancyWeekComponent = ({ day }: { day: number }) => {
  function shiftByOne(index: number): number {
    return index + 1 > 6 ? 0 : index + 1;
  }
  return (
    <div className={styles.week_component}>
      {["M", "T", "W", "T", "F", "S", "S"].map((week, index) => {
        return (
          <div
            key={String(week) + index}
            className={day === shiftByOne(index) ? styles.is_week : ""}
          >
            <p>{week}</p>
          </div>
        );
      })}
    </div>
  );
};

function DateTimeComponent() {
  const date = useGetDate();

  return (
    <div className={styles.date_time}>
      <p className={styles.date}>{`${date.toLocaleDateString("fr-FR")}`}</p>
      <p className={styles.time}>{date.toLocaleTimeString("fr-FR")}</p>

      <FancySmancyWeekComponent day={date.getDay()} />
    </div>
  );
}

export default DateTimeComponent;
