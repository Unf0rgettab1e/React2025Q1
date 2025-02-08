import { TAnime } from '../../api/types';
import Loader from '../ui/Loader/Loader';
import AnimeCard from './Card/Card';

interface AnimeListProps {
  animeData: TAnime[];
  loading: boolean;
}

export default function AnimeList({ animeData, loading }: AnimeListProps) {
  if (loading) return <Loader />;

  return (
    <>
      {animeData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {animeData.map(anime => (
            <AnimeCard key={anime.mal_id} data={anime} />
          ))}
        </div>
      ) : (
        <h1 className="text-2xl p-20 mx-auto max-w-200">Nothing was found... Try searching for something else.</h1>
      )}
    </>
  );
}
