import { FC } from "react";
import { Button } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { useHistory } from "../../context/history";
import Title from "../title";
import ClsGen from "../../utils/cls-gen";
import "./index.scss";

const cls = ClsGen("search-history");

interface IProps {
  loading: boolean;
  cityNameOnChange: (value: string, cb?: () => void) => void;
  countryCodeOnChange: (value: string | null, cb?: () => void) => void;
  fetch: (city: string, country: string | null) => void;
}

const SearchHistory: FC<IProps> = ({
  loading,
  cityNameOnChange,
  countryCodeOnChange,
  fetch,
}) => {
  const { history, removeHistory } = useHistory();

  const _handleSearch = (cityName: string, countryCode: string) => {
    cityNameOnChange(cityName);
    countryCodeOnChange(countryCode);
    fetch(cityName, countryCode);
  };

  return (
    <div className={cls()}>
      <Title title="Search History" />
      <div className={cls("list")}>
        {
          !history?.length && <div className={cls("no-record")}>No Record</div>
        }
        {history?.map((item, index) => (
          <div key={index} className={cls("item")}>
            <div className={cls("item-container")}>
              <div className={cls("item-label")}>
                {item?.city_name}, {item?.country_code} 
              </div>
              <div className={cls("item-action")}>
                <div className={cls("item-action")}>{dayjs.unix(item?.dt)?.format('YYYY-MM-DD HH:mm:ss')}</div>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={() =>
                    _handleSearch(item?.city_name, item?.country_code)
                  }
                  disabled={loading}
                />
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => item?.id && removeHistory(item.id)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
