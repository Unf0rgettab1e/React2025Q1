import { Component } from 'react';
import AnimeCard from './Card/Card';
import { TAnime } from '../../api/types';

interface AnimeListProps {
  animeData: TAnime[];
}

export default class AnimeList extends Component<AnimeListProps> {
  render() {
    const { animeData } = this.props;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {animeData.length > 0 ? (
          animeData.map(anime => (
            <AnimeCard
              key={anime.mal_id}
              title={anime.title_english}
              image={anime.images.webp.image_url}
              synopsis={anime.synopsis || 'No description available...'}
              url={anime.url}
            />
          ))
        ) : (
          <h1>No results found</h1>
        )}
      </div>
    );
  }
}
