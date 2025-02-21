import { Link, useLocation, useNavigate, useParams } from 'react-router';
import Icon from '~/components/ui/Icon';
import Loader from '~/components/ui/Loader/Loader';
import { useGetAnimeByIdQuery } from '~/store/apiSlice';

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: { data: animeData = null } = {}, isLoading } = useGetAnimeByIdQuery(Number(id));

  return (
    <div className="fixed inset-0 top-24 z-10 h-screen m-6 sm:m-0 bg-slate-700 sm:sticky sm:flex-1 overflow-hidden rounded-xl shadow-xl transition-all duration-300">
      <div className="fixed inset-0 h-screen w-screen z-8 bg-slate-800/60 sm:h-0 sm:w-0"></div>
      {!isLoading && animeData && (
        <div className="relative min-h-screen">
          <Icon
            id="cross"
            className="absolute top-1 left-1 z-20 text-slate-500 w-10 h-10 cursor-pointer hover:text-slate-400"
            onClick={() => navigate(`/${location.search}`)}
          />

          <div className="absolute inset-0">
            <img
              src={animeData.images.webp.image_url}
              alt={animeData.title_english}
              className="object-cover object-center w-full h-full md:object-top"
            />
          </div>
          <div className="absolute inset-0 bg-slate-800 opacity-60 backdrop-blur-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-transparent to-slate-600 opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-600 via-transparent to-transparent opacity-70"></div>

          <div className="flex justify-center flex-wrap gap-3 p-8 sm:gap-10">
            <div className="z-20 flex-shrink-0">
              <img
                src={animeData?.images.webp.large_image_url}
                alt={animeData?.title_english}
                className="z-10 w-40 h-auto rounded-lg shadow sm:w-64 -rotate-6"
              />
            </div>

            <div className="z-10 flex-1 min-w-[300px] max-w-full">
              <h1 className="text font-bold sm:font-extrabold sm:text-3xl font-poppins">{animeData.title_english}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-bold text-slate-300 sm:text-base md:gap-4 md:mt-4">
                <span className="flex items-center gap-1">{animeData?.type || '??'}</span>
                <span className="flex items-center gap-1">Eps {animeData.episodes || '??'}</span>
                <span className="flex items-center gap-1">{animeData.duration || '??'}</span>
                <span className="flex items-center gap-1">{animeData.aired?.prop.string || '??'}</span>
                <span className="flex items-center gap-1  text-yellow-800 dark:text-yellow-300">
                  {animeData.score || '??'}
                </span>
                <span className="px-2 py-1 text-xs text-slate-100  bg-orange-500 dark:bg-orange-700 rounded md:text-sm">
                  {animeData.rating || '??'}
                </span>
              </div>
              <hr className="my-4" />

              <div className="flex flex-wrap gap-2 md:gap-3 font-bold">
                {animeData.genres && animeData.genres?.length > 0 ? (
                  animeData.genres?.map(genre => (
                    <span
                      key={genre.mal_id}
                      className="px-2 py-1 text-xs text-slate-200 bg-orange-300 dark:bg-orange-800 rounded md:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400">No genres available</span>
                )}
              </div>

              <p className="sm:my-4 my-2 text-xs text-justify md:my-6 md:text-base">
                {animeData.synopsis?.slice(0, 400) + '...'}
              </p>

              {animeData.trailer?.url && (
                <Link
                  to={animeData.trailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-fit bg-rose-700 rounded-md px-2 py-1 font-bold hover:bg-rose-800"
                >
                  Watch Trailer
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex h-screen">{isLoading && <Loader />}</div>
    </div>
  );
};

export default AnimeDetails;
