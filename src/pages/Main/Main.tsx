import { useState } from 'react';
import searchAnime from '../../api/requests/searchAnime';
import { TAnime } from '../../api/types';
import AnimeList from '../../components/AnimeList/AnimeList';
import ErrorButton from '../../components/Errors/ErrorBoundary/ErrorButton/ErrorButton';
import ErrorResponse from '../../components/Errors/ErrorResponse/ErrorResponse';
import SearchForm from '../../components/SearchForm/SearchForm';

const Main: React.FC = () => {
  const [searchResults, setSearchResults] = useState<TAnime[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await searchAnime(query);
    setSearchResults(data);
    setIsLoading(false);
    setError(error);
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 mx-auto p-8">
      <div className="flex-1">
        <SearchForm onSearch={handleSearch} error={error} />
      </div>

      <div className="flex flex-col items-center h-full">
        {error && <ErrorResponse errorMessage={error} />}
        {searchResults && <AnimeList animeData={searchResults} loading={isLoading} />}
        <ErrorButton />
      </div>
    </div>
  );
};

export default Main;
