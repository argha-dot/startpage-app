import { useEffect, useState } from "react";
import useSWR from "swr";

import { weatherI } from "@/interfaces";
import useStickyState from "./useStickyState";

type LatLangType = {
  lat: number;
  lang: number;
};

function isLatLangType(obj: object): obj is LatLangType {
  return "lat" in obj && "lang" in obj;
}

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
  const [location, setLocation] = useState<LatLangType | null>(null);
  const [savedLocation, setSavedLocation] = useStickyState<{}>({}, "city");

  const previousLocation = isLatLangType(savedLocation)
    ? `lat=${savedLocation.lat}&lon=${savedLocation.lang}`
    : `q=${import.meta.env.VITE_FALLBACK_CITY},IN`;
  const urlLocation = location
    ? `lat=${location.lat}&lon=${location.lang}`
    : previousLocation;
  const url = `https://api.openweathermap.org/data/2.5/weather?${urlLocation}&appid=${import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`;

  const fetcher = async (url: string) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(url, fetcher, {
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

        if (
          !isLatLangType(savedLocation) ||
          (isLatLangType(savedLocation) &&
            (savedLocation.lat !== pos.coords.latitude ||
              savedLocation.lang !== pos.coords.longitude))
        ) {
          setSavedLocation({
            lat: pos.coords.latitude,
            lang: pos.coords.longitude,
          });
        }
        // setSavedLocation()
      },
      () => {
        setLocation(null);
      },
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
