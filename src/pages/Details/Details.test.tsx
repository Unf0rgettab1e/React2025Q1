import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, Mock, vi } from 'vitest';
import { MOCK_ANIME_DETAILS } from '~/__mocks__/mockTopAnimeList';
import { useGetAnimeByIdQuery } from '~/store/apiSlice';
import Details from './Details';

vi.mock(import('~/store/apiSlice'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAnimeByIdQuery: vi.fn(),
  };
});

describe('AnimeDetails', () => {
  it('renders loader while loading', async () => {
    (useGetAnimeByIdQuery as Mock).mockReturnValue({
      data: { data: MOCK_ANIME_DETAILS },
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Details />
      </MemoryRouter>
    );
    expect(await screen.findByTestId('loader')).toBeInTheDocument();
  });

  it('renders anime details when data is loaded', async () => {
    (useGetAnimeByIdQuery as Mock).mockReturnValue({ data: { data: MOCK_ANIME_DETAILS }, isLoading: false });
    render(
      <MemoryRouter initialEntries={['/details/11061']}>
        <Details />
      </MemoryRouter>
    );
    expect(await screen.findByText(MOCK_ANIME_DETAILS.title_english)).toBeInTheDocument();
    expect(await screen.findByText(MOCK_ANIME_DETAILS.genres[0].name)).toBeInTheDocument();
    expect(await screen.findByText('Watch Trailer')).toBeInTheDocument();
  });
});
