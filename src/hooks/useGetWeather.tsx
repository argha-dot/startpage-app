import { useEffect, useState } from "react";
import axios from "axios";

import { weatherI } from "@/interfaces";

type LatLangType = { lat: number; lang: number } | null


const useGetWeather = () => {
  const [weather, setWeather] = useState<weatherI>({
    temp: -1,
    feels_like: -1,
    weather: {
      description: "",
      icon_link: "",
    },
  });

  const [city, setCity] = useState<string>(import.meta.env.VITE_FALLBACK_CITY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState<LatLangType>(null)

  const getWeatherIconLink = (icon_code: string) =>
    `https://openweathermap.org/img/wn/${icon_code}@2x.png`;

  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      console.info("geolocation not supported");
      setLocation(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lang: pos.coords.longitude,
        });
      },
      () => {
        setLocation(null);
      }
    );
  };

  const getWeatherData = () => {
    const urlLocation = location ? `lat=${location.lat}&lon=${location.lang}` : `q=${import.meta.env.VITE_FALLBACK_CITY},IN`
    console.log("location: ", location)

    axios
      .get(
        `${import.meta.env.VITE_WEATHER_BASE_URL}/data/2.5/weather?${urlLocation
        }&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather({
          temp: res.data?.main?.temp,
          feels_like: res.data?.main?.feels_like,
          weather: {
            description: res.data?.weather[0].description,
            icon_link: getWeatherIconLink(res.data?.weather[0].icon),
          },
        });
        setCity(res.data?.name)
        setError(false);
      })
      .catch(() => {
        console.error("Error occured while fetching");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    getGeoLocation();
  }, [])

  useEffect(() => {
    getWeatherData()

    const interv = setInterval(() => getWeatherData(), 600_000);
    return () => clearInterval(interv);
  }, [location]);

  return {
    city,
    weather,
    loading,
    error,
  };
};

export default useGetWeather;
