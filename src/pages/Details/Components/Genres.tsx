interface AnimeGenresProps {
  genres?: Array<{ mal_id: number; name: string }>;
}

const AnimeGenres = ({ genres }: AnimeGenresProps) => {
  if (!genres || genres.length === 0) {
    return <span className="text-slate-400">No genres available</span>;
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 font-bold">
      {genres.map(genre => (
        <span
          key={genre.mal_id}
          className="px-2 py-1 text-xs text-slate-200 bg-orange-300 dark:bg-orange-800 rounded md:text-sm"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default AnimeGenres;
