import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import searchAnime from '../../api/requests/searchAnime';
import { TJikanResponse } from '../../api/types';
import AnimeList from '../../components/AnimeList/AnimeList';
import ErrorButton from '../../components/Errors/ErrorBoundary/ErrorButton/ErrorButton';
import ErrorResponse from '../../components/Errors/ErrorResponse/ErrorResponse';

const Main: FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState<Partial<TJikanResponse>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    console.log('searchQuery', searchQuery);

    handleSearch([searchQuery || '']);
  }, [searchQuery]);

  const handleSearch = async (params: Parameters<typeof searchAnime>) => {
    setIsLoading(true);
    setSearchResults(undefined);
    const response = await searchAnime(...params);
    if (response.data) setSearchResults(response);
    setError(response.error);
    setIsLoading(false);
  };

  const onChangePage = (page: number) => {
    handleSearch([searchQuery || '', page]);
  };

  return (
    <div className="flex-1 flex flex-col items-center h-full">
      <div className="flex justify-center w-full">
        {error && <ErrorResponse errorMessage={error} />}
        {searchResults?.data && (
          <AnimeList
            animeData={searchResults.data}
            pagination={searchResults.pagination}
            loading={isLoading}
            onChangePage={onChangePage}
          />
        )}
        <Outlet />
      </div>
      <ErrorButton />
    </div>
  );
};

export default Main;
