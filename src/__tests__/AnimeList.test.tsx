import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { TAnime, TPagination } from '~/api/types';
import AnimeList from '~/components/AnimeList/AnimeList';

const mockAnimeData: TAnime[] = [
  {
    mal_id: 1,
    title_english: 'Naruto',
    images: {
      webp: {
        large_image_url: 'https://example.com/image.jpg',
        image_url: 'https://example.com/image.jpg',
        small_image_url: 'https://example.com/image.jpg',
      },
    },
    synopsis: 'A ninja story.',
  },
  {
    mal_id: 2,
    title_english: 'One Piece',
    images: {
      webp: {
        large_image_url: 'https://example.com/image.jpg',
        image_url: 'https://example.com/image.jpg',
        small_image_url: 'https://example.com/image.jpg',
      },
    },
    synopsis: 'A pirate adventure.',
  },
];

const mockPagination: TPagination = {
  last_visible_page: 5,
  has_next_page: true,
};

describe('AnimeList Component', () => {
  test('Отображает список аниме-карточек при наличии данных', () => {
    render(
      <MemoryRouter>
        <AnimeList animeData={mockAnimeData} pagination={mockPagination} loading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Naruto/i)).toBeInTheDocument();
    expect(screen.getByText(/One Piece/i)).toBeInTheDocument();
  });

  test('Отображает сообщение, если список пуст', () => {
    render(
      <MemoryRouter>
        <AnimeList animeData={[]} pagination={mockPagination} loading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nothing was found... Try searching for something else./i)).toBeInTheDocument();
  });

  test('Отображает индикатор загрузки при loading=true', () => {
    render(
      <MemoryRouter>
        <AnimeList animeData={mockAnimeData} pagination={mockPagination} loading={true} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
