import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
import { toggleItem } from '~/store/animeDownloadSlice';
import type { AppDispatch, RootState } from '~/store/store';
import { Anime } from '~/types/animeApi';

interface AnimeCardProps {
  data: Anime;
}

export default function Card({ data }: AnimeCardProps) {
  const { title_english, images, synopsis, mal_id, title } = data;
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const selectedCards = useSelector((state: RootState) => state.animeDownload.selectedItems);
  const isSelected = selectedCards.some(item => item.mal_id === mal_id);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleItem(data));
  };

  return (
    <Link
      to={`/details/${mal_id}${location.search}`}
      className="relative w-full mx-auto bg-slate-700 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
      onContextMenu={handleRightClick}
      data-testid="card"
    >
      <img
        src={images.webp.large_image_url}
        alt={title_english || title}
        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-slate-200 mb-2">{title_english}</h2>
        <p className="text-sm text-slate-00 mb-4 line-clamp-3">{synopsis || 'No description available...'}</p>
      </div>
      <input
        type="checkbox"
        onChange={() => dispatch(toggleItem(data))}
        onClick={e => e.stopPropagation()}
        checked={isSelected}
        className="absolute bottom-2 right-2 w-5 h-5 cursor-pointer"
      />
    </Link>
  );
}
