/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_WEATHER_BASE_URL: string
  readonly VITE_FALLBACK_CITY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
