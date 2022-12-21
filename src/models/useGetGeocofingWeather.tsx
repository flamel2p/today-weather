import { useState } from 'react';
import { useHistory } from '../context/history';
import { ApiError } from '../api/core';
import { GeocodingWeatherDataQuery, GeocodingWeatherData } from '../types/geocoding-weather-data';
import { fetchGeocodingWeatherData } from '../api';
import { error } from '../utils/toast';
import { API_SUCCESS_CODE, UNKNOWN_ERROR } from '../const';

interface State {
  data: GeocodingWeatherData | null;
  notFound: boolean;
  loading: boolean;
}

const useGetGeocodingWeather = () => {
  const { addHistory } = useHistory();
  const [state, setState] = useState<State>({
    data: null,
    notFound: false,
    loading: false,
  });

  const fetch = async (query: GeocodingWeatherDataQuery) => {
    setState({
      data: null,
      notFound: false,
      loading: true,
    });

    try {
      const resp = await fetchGeocodingWeatherData(query);

      if (resp?.code === API_SUCCESS_CODE) {
        setState({
          data: resp?.result || null,
          notFound: false,
          loading: false,
        });

        const { name, dt, sys } =  resp?.result || {};

        addHistory({
          city_name: name || '',
          country_code: sys?.country || '',
          dt: dt || 0,
        });

      } else {
        setState({
          data: null,
          notFound: false,
          loading: false,
        });
        error(UNKNOWN_ERROR);
      }
    } catch (e: any) {
      setState((s) => ({
        ...s,
        loading: false,
      }));
      const { cod, message } = (e?.result! || {}) as ApiError;
      const notFound = `${cod}` === '404';

      setState({
        data: null,
        notFound,
        loading: false,
      });
      !notFound && error(`${cod}: ${message}` || UNKNOWN_ERROR);
    }
  };

  return {
    state,
    fetch,
  };
};

export default useGetGeocodingWeather;