import { useLocation, useNavigate } from 'react-router';
import Icon from '~/components/ui/Icon';
import { Anime } from '~/types/animeApi';

interface AnimeHeaderProps {
  data: Anime;
}

const AnimeHeader = ({ data: { title_english, type, episodes, duration, aired, score, rating } }: AnimeHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Icon
        id="cross"
        className="absolute top-1 left-1 z-20 text-slate-500 w-10 h-10 cursor-pointer hover:text-slate-400"
        onClick={() => navigate(`/${location.search}`)}
      />
      <h1 className="text font-bold sm:font-extrabold sm:text-3xl font-poppins">{title_english}</h1>
      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-bold text-slate-300 sm:text-base md:gap-4 md:mt-4">
        <span className="flex items-center gap-1">{type || '??'}</span>
        <span className="flex items-center gap-1">Eps {episodes || '??'}</span>
        <span className="flex items-center gap-1">{duration || '??'}</span>
        <span className="flex items-center gap-1">{aired?.string || '??'}</span>
        <span className="flex items-center gap-1 text-yellow-800 dark:text-yellow-300">{score || '??'}</span>
        <span className="px-2 py-1 text-xs text-slate-100 bg-orange-500 dark:bg-orange-700 rounded md:text-sm">
          {rating || '??'}
        </span>
      </div>
    </>
  );
};

export default AnimeHeader;
