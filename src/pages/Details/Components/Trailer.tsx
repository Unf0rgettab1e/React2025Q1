import { Link } from 'react-router';

interface AnimeTrailerProps {
  trailerUrl: string;
}

const AnimeTrailer = ({ trailerUrl }: AnimeTrailerProps) => {
  return (
    <Link
      to={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center w-fit bg-rose-700 rounded-md px-2 py-1 font-bold hover:bg-rose-800"
    >
      Watch Trailer
    </Link>
  );
};

export default AnimeTrailer;
