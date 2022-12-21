import { useState } from 'react';
import dayjs from 'dayjs';
import { SearchHistoryItem } from '../types/search-history';
import { error } from '../utils/toast';

const HISTORY_KEY = 'search_history';
const MAX_HISTORY = 50;

const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  const fetch = () => {
    setHistory([]);
    try {
      const historyStr = localStorage.getItem(HISTORY_KEY);

      if (historyStr) {
        const data = JSON.parse?.(historyStr);
        setHistory(data);
      }
    } catch (e) {
      error('Error: Search history retrieve error');
    }
  };

  const add = (history: SearchHistoryItem) => {
    const {
      city_name, country_code, dt
    } = history;
    
    const id = `${country_code}_${city_name}_${dayjs()?.unix()}`;

    setHistory(prevState => {
      const state = [{...history, id}, ...prevState];
      if (state?.length > MAX_HISTORY) {
        state.length = MAX_HISTORY;
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(state));
      return state;
    });
  }
  
  const remove = (id: string) => {
    const _index = history?.findIndex(item => item?.id === id);
    if (_index > -1) {
      setHistory(prevState => {
       const state = [...prevState];
       state?.splice(_index, 1);
       localStorage.setItem(HISTORY_KEY, JSON.stringify(state));
       return state;
      });
    }
  }

  return {
    history,
    fetch,
    add,
    remove,
  };
};

export default useSearchHistory;