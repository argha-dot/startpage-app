import useGetDate from "@/hooks/useGetDate";
import styles from "@/styles/dateTime.module.scss";

const BinaryClock = () => {
  const date = useGetDate();

  function dect2Bin(dec: number): string {
    return (dec >>> 0).toString(2).padStart(4, "0");
  }

  function convert(number: number): Boolean[][] {
    let retarr: Boolean[][] = [];

    Array.from(String(number).padStart(2, "0"), Number).map((n) => {
      retarr.push(Array.from(dect2Bin(n), (v) => (v === "1" ? true : false)));
    });

    return retarr;
  }

  return (
    <div className={styles.binary_clock}>
      {[date.getHours(), date.getMinutes(), date.getSeconds()].map((number) => {
        return (
          <div className={styles.binary_hours}>
            {convert(number).map((col) => (
              <div>
                {col.map((row) => (
                  <div className={row ? styles.color_clock : ""}></div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export { BinaryClock };
