import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';
import searchAnime from '../../api/requests/searchAnime';
import { TAnime } from '../../api/types';
import AnimeList from '../../components/AnimeList/AnimeList';
import ErrorButton from '../../components/Errors/ErrorBoundary/ErrorButton/ErrorButton';
import ErrorResponse from '../../components/Errors/ErrorResponse/ErrorResponse';

const Main: FC = () => {
  const location = useLocation();
  const { id } = useParams();
  // const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState<TAnime[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    handleSearch(searchQuery || '');
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await searchAnime(query);
    setSearchResults(data);
    setIsLoading(false);
    setError(error);
  };

  return (
    <div className="flex-1 flex flex-col items-center h-full">
      <div className="flex justify-center w-full">
        {error && <ErrorResponse errorMessage={error} />}
        {searchResults && <AnimeList animeData={searchResults} loading={isLoading} />}
        {id && <Outlet />}
      </div>
      <ErrorButton />
    </div>
  );
};

export default Main;
