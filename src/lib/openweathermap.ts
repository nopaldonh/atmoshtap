import { CityResponse, CurrentWeather, ForecastResponse } from '@/types';
import { apiFetch } from './utils';

export function findCities(q: string) {
  return apiFetch<CityResponse>('/find', {
    params: { q },
  });
}

export function getWeatherForecastByCityId(id: number) {
  return apiFetch<ForecastResponse>('/forecast', {
    params: { id },
  });
}

export function getCurrentWeatherByCityId(id: number) {
  return apiFetch<CurrentWeather>('/weather', {
    params: { id },
  });
}
