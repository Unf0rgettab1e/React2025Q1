import { useState } from 'react';

export const LS_KEY = 'animeSearchQuery';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => localStorage.getItem(LS_KEY) || '');

  const saveQuery = (newQuery: string) => {
    localStorage.setItem(LS_KEY, newQuery);
  };

  return { query, setQuery, saveQuery };
};
