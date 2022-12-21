import { FC } from 'react';
import { Select } from 'antd';
import CountryListJSON from '../../data/country-list.json';

interface IProps {
  className?: string;
  selectedValue: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const SelectCountry: FC<IProps> = ({className = '', selectedValue, disabled, onChange}) => {

  const countryListData = CountryListJSON?.map((data) => ({
    label: `${data.Code} ${data.Name}`,
    value: data.Code,
  }))

  const _handleOnChange = (value: string) => {
    console.log(`selected ${value}`);
    onChange(value);
  };

   return <Select
    className={className}
    showSearch
    placeholder="Select country"
    optionFilterProp="children"
    onChange={_handleOnChange}
    value={selectedValue}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={countryListData}
    disabled={disabled}
  />
  }

export default SelectCountry;