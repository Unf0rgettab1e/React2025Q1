import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { TAnime } from '~/api/types';
import Card from '~/components/AnimeList/Card/Card';

const mockAnime: TAnime = {
  mal_id: 123,
  title_english: 'Attack on Titan',
  images: {
    webp: {
      large_image_url: 'https://example.com/image.jpg',
      image_url: 'https://example.com/image.jpg',
      small_image_url: 'https://example.com/image.jpg',
    },
  },
  synopsis: 'A dark fantasy anime about titans and humanity.',
};

describe('Card Component', () => {
  test('Рендерит заголовок, изображение и описание', () => {
    render(
      <MemoryRouter>
        <Card data={mockAnime} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Attack on Titan/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /attack on titan/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockAnime.images.webp.large_image_url);
    expect(img).toHaveAttribute('alt', mockAnime.title_english);

    expect(screen.getByText(/A dark fantasy anime about titans and humanity./i)).toBeInTheDocument();
  });

  test('Отображает "No description available..." если нет описания', () => {
    const mockAnimeWithoutSynopsis = { ...mockAnime, synopsis: '' };

    render(
      <MemoryRouter>
        <Card data={mockAnimeWithoutSynopsis} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No description available.../i)).toBeInTheDocument();
  });

  test('Ссылка ведет на правильный URL', async () => {
    render(
      <MemoryRouter>
        <Card data={mockAnime} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/details/${mockAnime.mal_id}`);
  });
});
