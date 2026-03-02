export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: ForecastCity;
}

export interface Forecast {
  dt: number;
  main: ForecastMainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: ForecastSys;
  dt_txt: string;
}

export interface ForecastMainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  '3h': number;
}

export interface Snow {
  '3h': number;
}

export interface ForecastSys {
  pod: 'd' | 'n';
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CityResponse {
  message: string;
  cod: string;
  count: number;
  list: City[];
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  main: CityMainWeather;
  dt: number;
  wind: Wind;
  sys: CitySys;
  rain?: Rain;
  snow?: Snow;
  clouds: Clouds;
  weather: Weather[];
}

export interface CityMainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface CitySys {
  country: string;
}

export interface CurrentWeather {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: CityMainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: CurrentWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface CurrentWeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
