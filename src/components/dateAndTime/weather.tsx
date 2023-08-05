import Skeleton from "react-loading-skeleton";

import useGetWeather from "@/hooks/useGetWeather";
import styles from "@/styles/dateTime.module.scss";

function WeatherComponent() {
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
                      <span>{weather.temp?.toFixed(1)}&deg;</span>
                      <span>{weather.feels_like?.toFixed(1)}&deg;</span>
                    </span>

                    <span>C</span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className={styles.weather}>
            <div style={{ width: "50px", height: "50px" }}>
              <p style={{ width: "50px", height: "50px", fontSize: "39px" }}>
                😔
              </p>
            </div>
            <p style={{ textAlign: "center" }}>Can't Fetch</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherComponent;
