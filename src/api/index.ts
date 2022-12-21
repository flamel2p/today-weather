import { Method, req, setBodyToUrlParam } from './core';
import { GeocodingWeatherDataQuery, GeocodingWeatherData } from '../types/geocoding-weather-data';

const apiHost: string = 'https://api.openweathermap.org';
const apiKey: string = '3bd21b173100bab19e4335cd0fdb6720';

export const fetchGeocodingWeatherData = (body: GeocodingWeatherDataQuery) =>
  req<GeocodingWeatherData>(
    Method.GET,
    setBodyToUrlParam(`${apiHost}/data/2.5/weather`, {...body, appid: apiKey}),
  );