interface weatherI {
  temp: number;
  feels_like: number;
  weather: {
    description: string;
    icon_link: string;
  };
}

export type { weatherI };
