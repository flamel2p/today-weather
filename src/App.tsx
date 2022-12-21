import { useState } from "react";
import { debounce } from "lodash";
import useGetGeocodingWeather from "./models/useGetGeocofingWeather";
import { Unit_ENUM } from "./const";
import Title from "./components/title";
import SearchForm from "./components/search-form";
import SearchHistory from "./components/search-history";
import Result from './components/result';
import NotFound from "./components/not-found";
import "./App.scss";

function App() {
  const {
    state: { data, notFound, loading },
    fetch,
  } = useGetGeocodingWeather();
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState<string | null>("");

  const _handleCityNameChange = (value: string) => {
    setCityName(value);
  };

  const _handleCountryChange = (value: string | null) => {
    setCountryCode(value);
  };

  const _handleClear = () => {
    setCityName("");
    setCountryCode(null);
  };

  const _fetch = (city: string, country: string | null) => {
    let q = city;
    if (country) {
      q += `,${country?.toLocaleLowerCase()}`;
    }
    q && fetch({ q, units: Unit_ENUM.METRIC });
  }

  const _handleSearch = debounce(() => _fetch(cityName, countryCode), 200);

  return (
    <div className="App">
      <Title title="Today's Weather" />
      <SearchForm
        cityName={cityName}
        countryCode={countryCode}
        loading={loading}
        onSearch={() => _handleSearch()}
        onClear={_handleClear}
        cityNameOnChange={_handleCityNameChange}
        countryCodeOnChange={_handleCountryChange}
      />
      {
        data && <Result data={data}/>
      }
      {
        notFound && <NotFound />
      }
      <SearchHistory
        loading={loading}
        fetch={_fetch}
        cityNameOnChange={_handleCityNameChange}
        countryCodeOnChange={_handleCountryChange}
      />
    </div>
  );
}

export default App;
