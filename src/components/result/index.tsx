import { FC } from "react";
import { GeocodingWeatherData } from "../../types/geocoding-weather-data";
import ClsGen from "../../utils/cls-gen";
import './index.scss';

const cls = ClsGen('result');

interface IProps {
  data: GeocodingWeatherData;
}
const Result: FC<IProps> = ({ data }) => {
  return (
    <div className={cls()}>
      {data && (
        <div className={cls('container')}>
          <div className={cls('label light')}>
            {data?.name}, {data?.sys?.country}
          </div>
          <div className={cls('weather')}>{data?.weather?.map((weather) => weather?.main)}</div>
          <div className={cls('label')}>
            Description:
            {data?.weather?.map((weather) => weather?.description)?.join(", ")}
          </div>
          <div className={cls('label')}>
            Temparature:{" "}
            {data?.main?.temp_min === data?.main?.temp_max
              ? `${data?.main?.temp}°C`
              : `${data?.main?.temp_min}°C ~ ${data?.main?.temp_max}°C`}
          </div>
          <div className={cls('label')}>Humidity: {data?.main?.humidity}%</div>
          <div className={cls('label')}>Time: {data?.dt}</div>
        </div>
      )}
    </div>
  );
};

export default Result;
