import {
  Coord, Weather, Main, Wind, Rain, Clouds, Sys
} from './common';
import {
  Mode_ENUM, Unit_ENUM
} from '../const';

export interface GeocodingWeatherDataQuery {
  q: string;
  mode?: Mode_ENUM; // default = JSON
  units?: Unit_ENUM; // default = Standard
  lang?: string;
}

export interface GeocodingWeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone:number;
    id: number;
    name: string;
    cod: number;
}