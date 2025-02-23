import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, Mock, vi } from 'vitest';
import { MOCK_EMPTY_ANIME_LIST, MOCK_TOP_ANIME_LIST } from '~/__mocks__/mockTopAnimeList';
import AnimeList from '~/components/AnimeList/AnimeList';
import { useGetAnimeListQuery } from '~/store/apiSlice';
import { store } from '~/store/store';

const RenderAnimeList = () => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AnimeList />
      </Provider>
    </MemoryRouter>
  );
};

vi.mock(import('~/store/apiSlice'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAnimeListQuery: vi.fn(),
  };
});

describe('AnimeList Component', () => {
  it('Renders the specified number of cards', () => {
    (useGetAnimeListQuery as Mock).mockReturnValue({
      data: MOCK_TOP_ANIME_LIST,
      isLoading: false,
      isError: false,
    });

    render(<RenderAnimeList />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(20);
  });

  it('Displays message when no cards are present', () => {
    (useGetAnimeListQuery as Mock).mockReturnValue({
      data: MOCK_EMPTY_ANIME_LIST,
      isLoading: false,
      isError: false,
    });

    render(<RenderAnimeList />);
    expect(screen.getByText(/Nothing was found... Try searching for something else./i)).toBeInTheDocument();
  });

  it('Displays Loader when data is loading', () => {
    (useGetAnimeListQuery as Mock).mockReturnValue({
      data: MOCK_TOP_ANIME_LIST,
      isLoading: true,
      isError: false,
    });

    render(<RenderAnimeList />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
