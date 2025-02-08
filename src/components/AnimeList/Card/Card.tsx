import { TAnime } from '../../../api/types';

interface AnimeCardProps {
  data: TAnime;
}

export default function Card({ data }: AnimeCardProps) {
  const { title_english, images, url, synopsis } = data;

  return (
    <div className="w-full mx-auto bg-slate-600 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={images.webp.large_image_url}
          alt={title_english}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </a>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-slate-200 mb-2">{title_english}</h2>
        <p className="text-sm text-slate-00 mb-4 line-clamp-3">{synopsis || 'No description available...'}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:underline">
          Read more
        </a>
      </div>
    </div>
  );
}
