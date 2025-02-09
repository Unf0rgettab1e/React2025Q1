import { useEffect, useState } from 'react';
import Pagination from '~/components/ui/Pagination';
import { TAnime, TPagination } from '../../api/types';
import Loader from '../ui/Loader/Loader';
import AnimeCard from './Card/Card';

interface AnimeListProps {
  animeData: TAnime[];
  pagination?: TPagination;
  loading: boolean;
  onChangePage: (page: number) => void;
}

export default function AnimeList({ animeData, pagination, loading, onChangePage }: AnimeListProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    onChangePage(page);
  }, [page]);

  if (loading) return <Loader />;

  return (
    <div className="@container flex-1">
      {animeData.length > 0 ? (
        <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 @4xl:grid-cols-6 gap-4 p-4">
          {animeData.map(anime => (
            <AnimeCard key={anime.mal_id} data={anime} />
          ))}
        </div>
      ) : (
        <h1 className="text-2xl p-20 mx-auto max-w-200">Nothing was found... Try searching for something else.</h1>
      )}
      {pagination && <Pagination page={page} lastPage={pagination.last_visible_page || 1} setPage={setPage} />}
    </div>
  );
}
