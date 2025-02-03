import { Component } from 'react';
import AnimeCard from './Card/Card';
import { TAnime } from '../../api/types';
import Loader from '../ui/Loader/Loader';

interface AnimeListProps {
  animeData: TAnime[];
  loading: boolean;
}

export default class AnimeList extends Component<AnimeListProps> {
  render() {
    const { animeData, loading } = this.props;

    if (loading) return <Loader />;

    return (
      <>
        {animeData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {animeData.map(anime => (
              <AnimeCard
                key={anime.mal_id}
                title={anime.title_english}
                image={anime.images.webp.image_url}
                synopsis={anime.synopsis || 'No description available...'}
                url={anime.url}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-2xl p-20 mx-auto max-w-200">Nothing was found... Try searching for something else.</h1>
        )}
      </>
    );
  }
}
