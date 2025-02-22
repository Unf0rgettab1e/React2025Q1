import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Flyout from '~/components/AnimeList/Flyout/Flyout';
import ErrorResponse from '~/components/Errors/ErrorResponse/ErrorResponse';
import Pagination from '~/components/ui/Pagination';
import { useGetAnimeListQuery } from '~/store/apiSlice';
import getApiErrorMessage from '~/utils/getApiErrorMessage';
import Loader from '../ui/Loader/Loader';
import AnimeCard from './Card/Card';

export default function AnimeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
  const {
    data: { data: animeData = [], pagination } = {},
    isLoading,
    isError,
    error,
  } = useGetAnimeListQuery({ query, page });

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);

  if (isLoading) return <Loader />;
  if (isError && error) return <ErrorResponse errorMessage={getApiErrorMessage(error)} />;

  return (
    <div className="@container flex-1">
      {animeData.length > 0 ? (
        <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 @4xl:grid-cols-6 gap-4">
          {animeData.map(anime => (
            <AnimeCard key={anime.mal_id} data={anime} />
          ))}
        </div>
      ) : (
        <h1 className="text-2xl p-20 mx-auto max-w-200">Nothing was found... Try searching for something else.</h1>
      )}
      {pagination && <Pagination page={page} lastPage={pagination.last_visible_page || 1} setPage={setPage} />}
      <Flyout />
    </div>
  );
}
