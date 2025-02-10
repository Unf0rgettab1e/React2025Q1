import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import getAnimeById from '~/api/requests/getAnimeByid';
import { TAnime } from '~/api/types';
import Icon from '~/components/ui/Icon';
import Loader from '~/components/ui/Loader/Loader';

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [animeData, setAnimeData] = useState<TAnime>();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getAnimeById(Number(id)).then(res => {
        setAnimeData(res.data);
        setLoading(false);
      });
    });
  }, [id]);

  return (
    <div className="text-rose-100 bg-slate-700 flex-1 sticky top-24 h-screen rounded-xl overflow-hidden shadow-xl transition-all duration-300">
      {!loading && animeData && (
        <div className="relative min-h-screen">
          <Icon
            id="cross"
            className="absolute top-2 right-2 z-20 text-slate-500 w-10 h-10 cursor-pointer hover:text-slate-400"
            onClick={() => navigate(`/${location.search}`)}
          />

          <div className="absolute inset-0">
            <img
              src={animeData.images.webp.image_url}
              alt={animeData.title_english}
              className="object-cover object-center w-full h-full md:object-top"
            />
          </div>
          <div className="absolute inset-0 bg-slate-950 opacity-60 backdrop-blur-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70"></div>

          <div className="flex justify-center gap-3 p-6 sm:gap-10">
            <div className="z-20">
              <img
                src={animeData?.images.webp.large_image_url}
                alt={animeData?.title_english}
                className="z-10 w-40 h-auto rounded-lg shadow sm:w-64 -rotate-6"
              />
            </div>

            <div className="z-10">
              <h1 className="text font-bold sm:font-extrabold sm:text-3xl font-poppins">{animeData.title_english}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300 sm:text-base md:gap-4 md:mt-4">
                <span className="flex items-center gap-1">{animeData?.type || '??'}</span>
                <span className="flex items-center gap-1">Eps {animeData.episodes || '??'}</span>
                <span className="flex items-center gap-1">{animeData.duration || '??'}</span>
                <span className="flex items-center gap-1">{animeData.aired?.prop.string || '??'}</span>
                <span className="flex items-center gap-1 text-yellow-300">{animeData.score || '??'}</span>
                <span className="px-2 py-1 text-xs text-white bg-orange-700 rounded md:text-sm">
                  {animeData.rating || '??'}
                </span>
              </div>
              <hr className="my-4" />

              <div className="flex flex-wrap gap-2 md:gap-3">
                {animeData.genres && animeData.genres?.length > 0 ? (
                  animeData.genres?.map(genre => (
                    <span
                      key={genre.mal_id}
                      className="px-2 py-1 text-xs text-slate-100 bg-orange-800 rounded md:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400">No genres available</span>
                )}
              </div>

              <p className="sm:my-4 my-2 text-xs text-justify max-w-56 sm:max-w-[700px] md:my-6 md:text-base">
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
      <div className="flex h-screen">{loading && <Loader />}</div>
    </div>
  );
};

export default AnimeDetails;
