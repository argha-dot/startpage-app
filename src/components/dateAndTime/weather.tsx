import Skeleton from "react-loading-skeleton";
import useGetWeather from "@/hooks/useGetWeather";

import styles from "@/styles/dateTime.module.scss";

function WeatherComponent() {
  const { city, weather, loading, error } = useGetWeather();
  console.log(city);

  return (
    <div className={styles.basic_info}>
      {!error ? (
        <>
          {loading && !city && !error ? (
            <Skeleton width={"100%"} height={120} />
          ) : (
            <>
              <p>{city}</p>

              <div className={styles.weather}>
                <div className={styles.weather_icon}>
                  <img src={weather.weather.icon_link} alt="Weather Icon" />
                  <p
                    style={{
                      textTransform: "capitalize",
                      textAlign: "center",
                      fontSize: "0.85rem",
                    }}
                  >
                    {weather.weather.description}
                  </p>
                </div>

                <div className={styles.weather_text}>
                  <div>
                    <span>{weather.temp?.toFixed(1)}</span>
                    <span>{weather.feels_like?.toFixed(1)}</span>
                  </div>

                  <span>&deg;</span>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className={styles.weather_error}>
          <p style={{ width: "50px", height: "50px", fontSize: "39px" }}>😔</p>
          <p style={{ textAlign: "center" }}>Can't Fetch</p>
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;
