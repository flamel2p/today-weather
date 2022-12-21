import {
  FC,
  createContext,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import {
  SearchHistoryItem
} from '../types/search-history';
import useSearchHistory from '../models/useSearchHistory';

interface HistoryContextType {
  history: SearchHistoryItem[];
  addHistory: (value: SearchHistoryItem) => void;
  removeHistory: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addHistory: () => {},
  removeHistory: () => {},
});

interface Props {
  children: any;
}

const HistoryProvider: FC<Props> = ({ children }) => {
  const { history, fetch: fetchHistory, add: addHistory, remove: removeHistory } = useSearchHistory();

  useEffect(() => {
    console.log('Fetch Search History');
    fetchHistory();
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistory,
        removeHistory
      }}
    >
      {useMemo(() => children, [history])}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryContext, HistoryProvider, useHistory };