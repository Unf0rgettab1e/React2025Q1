import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import searchAnime from '../../api/requests/searchAnime';
import { TJikanResponse } from '../../api/types';
import AnimeList from '../../components/AnimeList/AnimeList';
import ErrorButton from '../../components/Errors/ErrorBoundary/ErrorButton/ErrorButton';
import ErrorResponse from '../../components/Errors/ErrorResponse/ErrorResponse';

const Main: FC = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const searchPage = new URLSearchParams(location.search).get('page');
  const [searchResults, setSearchResults] = useState<Partial<TJikanResponse>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    handleSearch([searchQuery || '', Number(searchPage) || 1]);
  }, [searchQuery, searchPage]);

  const handleSearch = async (params: Parameters<typeof searchAnime>) => {
    setIsLoading(true);
    const response = await searchAnime(...params);
    if (response.data) setSearchResults(response);
    setError(response.error);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center h-full">
      <div className="flex justify-center w-full p-4 gap-x-4 md:gap-x-8">
        {error && !searchResults && <ErrorResponse errorMessage={error} />}
        {searchResults?.data && (
          <AnimeList animeData={searchResults.data} pagination={searchResults.pagination} loading={isLoading} />
        )}
        <Outlet />
      </div>
      <ErrorButton />
    </div>
  );
};

export default Main;
