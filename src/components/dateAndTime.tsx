import useGetDate from "@/hooks/useGetDate";
import useGetWeather from "@/hooks/useGetSystemInfo";
import styles from "@/styles/dateTime.module.scss";
import Skeleton from "react-loading-skeleton";

const FancySmancyWeekComponent = ({day}: {day: number}) => {
  function shiftByOne(index: number): number {
    return index + 1 > 6 ? 0 : index + 1
  }
  return <div className={styles.week_component}>
    {
      ["M", "T", "W", "T", "F", "S", "S"].map((week, index) => {
        return (
          <div key={String( week ) + index} className={day === shiftByOne(index) ? styles.is_week : ""}>
            <p>{week}</p>
          </div>
        )
      })
    }
  </div>
}

const BinaryClock = () => {
  const date = useGetDate();

  function dect2Bin(dec: number): string {
    return (dec >>> 0).toString(2).padStart(4, "0");
  }

  function convert(number: number): Boolean[][] {
    let retarr: Boolean[][] = []

    Array.from(String(number).padStart(2, "0"), Number).map(n => {
      retarr.push(Array.from(dect2Bin(n), v => v === "1" ? true : false))
    })

    return retarr
  }

  return <div className={styles.binary_clock}>
    {
      [date.getHours(), date.getMinutes(), date.getSeconds()].map(number => {
        return (
          <div className={styles.binary_hours}>
            {
              convert(number).map(col => <div>
                {
                  col.map(row => <div className={row ? styles.color_clock : ""}></div>)
                }
              </div>)
            }
          </div>
        )
      })
    }
  </div>
}

const GeneralStatusComponent = () => {
  return (
    <div className={styles.container}>
      <DateTimeComponent />
      <BasicInfoComponent />
    </div>
  );
};

function BasicInfoComponent() {
  const { city, weather, loading, error } = useGetWeather();

  return (
    <div className={styles.basic_info}>
      <div style={{ alignSelf: "center", paddingLeft: "10px" }}>
        {
          loading ? 
            <Skeleton width={120} height={24} /> :
            <p style={{ fontSize: "1.5rem" }}>{city}</p>
        }
      </div>

      <div className={styles.weather}>
        {!error ? (
          <>
            {loading ? (
              <div
                style={{
                  width: "70px",
                  height: "40px",
                  display: "flex",
                  placeItems: "center",
                }}
              >
                <Skeleton width={50} height={40} />
              </div>
            ) : (
              <img
                className={styles.weather_icon}
                src={weather.weather.icon_link}
                alt="Weather Icon"
              />
            )}

            <div className={styles.weather_text}>
              {loading ? (
                <Skeleton count={2} width={80} height={16} />
              ) : (
                <>
                  <p style={{ textTransform: "capitalize", textAlign: "center", fontSize: "0.85rem" }}>
                    {weather.weather.description}
                  </p>
                  <div>
                    <span>
                      <span>{weather.temp.toFixed(1)}&deg;</span>
                      <span>{weather.feels_like.toFixed(1)}&deg;</span>
                    </span>

                    <span>C</span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className={styles.weather}>
            <div style={{ width: "70px", height: "70px" }}>
              <p style={{ width: "50px", height: "50px", fontSize: "39px" }}>
                😔
              </p>
            </div>
            <p style={{ textAlign: "center" }}>Cannot fetch weather data</p>
          </div>
        )}
      </div>
    </div>
  );
}

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

export default GeneralStatusComponent;
export {
  BinaryClock
}
