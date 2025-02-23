import { useParams } from 'react-router';
import Loader from '~/components/ui/Loader/Loader';
import AnimeGenres from '~/pages/Details/Components/Genres';
import AnimePoster from '~/pages/Details/Components/Poster';
import AnimeTrailer from '~/pages/Details/Components/Trailer';
import { useGetAnimeByIdQuery } from '~/store/apiSlice';
import AnimeHeader from './Components/AnimeHeader';
import AnimeBackground from './Components/Background';

const AnimeDetails = () => {
  const { id } = useParams();
  const { data: { data: animeData = null } = {}, isLoading } = useGetAnimeByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Loader />
      </div>
    );
  }

  if (!animeData) {
    return <div>No data available</div>;
  }

  return (
    <div className="fixed inset-0 top-24 z-10 h-screen m-6 sm:m-0 bg-slate-700 sm:sticky sm:flex-1 overflow-hidden rounded-xl shadow-xl transition-all duration-300">
      <div className="fixed inset-0 h-screen w-screen z-8 bg-slate-800/60 sm:h-0 sm:w-0"></div>
      {animeData && (
        <div className="relative min-h-screen">
          <AnimeBackground imageUrl={animeData.images.webp.image_url} />
          <div className="flex justify-center flex-wrap gap-3 p-8 sm:gap-10">
            <AnimePoster imageUrl={animeData.images.webp.large_image_url} title={animeData.title_english || 'Poster'} />
            <div className="z-10 flex-1 min-w-[300px] max-w-full">
              <AnimeHeader data={animeData} />
              <hr className="my-4" />
              <AnimeGenres genres={animeData.genres} />
              <p className="sm:my-4 my-2 text-xs text-justify md:my-6 md:text-base">
                {animeData.synopsis?.slice(0, 400) + '...'}
              </p>
              {animeData.trailer?.url && <AnimeTrailer trailerUrl={animeData.trailer.url} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetails;
