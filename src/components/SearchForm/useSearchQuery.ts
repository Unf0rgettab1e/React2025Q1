import { useState } from 'react';

export const LC_KEY = 'animeSearchQuery';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => localStorage.getItem(LC_KEY) || '');

  const saveQuery = (newQuery: string, cb?: (value: string) => void) => {
    localStorage.setItem(LC_KEY, newQuery);
    cb?.(newQuery);
  };

  return { query, setQuery, saveQuery };
};
