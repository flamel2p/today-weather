import { FC, useMemo } from "react";
import { Input, Button } from "antd";
import SelectCountry from "../select-country";
import ClsGen from "../../utils/cls-gen";
import "./index.scss";

const cls = ClsGen("search-form");

interface IProps {
  cityName: string;
  countryCode: string | null;
  loading: boolean;
  cityNameOnChange: (value: string) => void;
  countryCodeOnChange: (value: string | null) => void;
  onSearch: () => void;
  onClear: () => void;
}

const SearchForm: FC<IProps> = ({
  cityName,
  countryCode,
  loading,
  cityNameOnChange,
  countryCodeOnChange,
  onSearch,
  onClear,
}) => {
  const disabledSearch = useMemo(
    () => !cityName || loading,
    [cityName, loading]
  );

  const _handleCityNameOnChange = (e: any) => {
    cityNameOnChange(e?.target?.value);
  };
  const _handleCountryOnChange = (value: string) => {
    countryCodeOnChange(value);
  };

  return (
    <div className={cls()}>
      <div className={cls("form")}>
        <div className={cls("form-item")}>
          <div className={cls("form-label")}>City</div>
          <Input
            className={cls("input")}
            placeholder="Enter city name"
            value={cityName}
            onChange={_handleCityNameOnChange}
            disabled={loading}
          />
        </div>
        <div className={cls("form-item")}>
          <div className={cls("form-label")}>Country</div>
          <SelectCountry
            className={cls("select")}
            selectedValue={countryCode}
            onChange={_handleCountryOnChange}
            disabled={loading}
          />
        </div>
        <Button
          type="primary"
          onClick={onSearch}
          disabled={disabledSearch}
          loading={loading}
        >
          Search
        </Button>
        <Button onClick={onClear} disabled={disabledSearch}>
          Clear
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default SearchForm;
