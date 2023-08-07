import { useEffect, useState } from "react";
import useSWR from "swr";

import { weatherI } from "@/interfaces";

type LatLangType = { lat: number; lang: number } | null;

const getWeatherIconLink = (icon_code: string) =>
  `https://openweathermap.org/img/wn/${icon_code}@2x.png`;

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
  const [location, setLocation] = useState<LatLangType>(null);

  const urlLocation = location
    ? `lat=${location.lat}&lon=${location.lang}`
    : `q=${import.meta.env.VITE_FALLBACK_CITY},IN`;
  const url = `https://api.openweathermap.org/data/2.5/weather?${urlLocation}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }&units=metric`;

  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(url, (url) => fetch(url).then((res) => res.json()), {
    refreshInterval: 300_000,
  });

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

  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    if (!error || !loading) {
      setCity(data?.name);

      setWeather({
        temp: data?.main?.temp,
        feels_like: data?.main?.feels_like,
        weather: {
          description: data?.weather[0].description,
          icon_link: getWeatherIconLink(data?.weather[0].icon),
        },
      });
    }
  }, [location, loading, error]);

  return {
    city,
    weather,
    loading,
    error,
  };
};

export default useGetWeather;
