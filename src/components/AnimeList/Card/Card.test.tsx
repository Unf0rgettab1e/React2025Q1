import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { MOCK_ANIME_DETAILS } from '~/__mocks__/mockTopAnimeList';
import Card from '~/components/AnimeList/Card/Card';
import { toggleItem } from '~/store/animeDownloadSlice';
import { Anime } from '~/types/animeApi';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('~/store/animeDownloadSlice', () => ({
  toggleItem: vi.fn(),
}));

const RenderCard = ({ data = MOCK_ANIME_DETAILS }: { data?: Anime }) => {
  return (
    <MemoryRouter>
      <Card data={data} />
    </MemoryRouter>
  );
};

describe('Card Component', () => {
  const dispatchMock = vi.fn();
  const useSelectorMock = useSelector as MockedFunction<typeof useSelector>;

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(dispatchMock);
  });

  it('Displays the correct card information', () => {
    useSelectorMock.mockReturnValue([]);
    render(<RenderCard />);

    expect(screen.getByText(/Hunter x Hunter/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /Hunter x Hunter/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', MOCK_ANIME_DETAILS.images.webp.large_image_url);
    expect(img).toHaveAttribute('alt', MOCK_ANIME_DETAILS.title_english);

    expect(screen.getByText(new RegExp(MOCK_ANIME_DETAILS.synopsis.slice(0, 50), 'i'))).toBeInTheDocument();
  });

  it('Displays "No description available..." when synopsis is empty', () => {
    const mockAnimeWithoutSynopsis = { ...MOCK_ANIME_DETAILS, synopsis: '' };
    useSelectorMock.mockReturnValue([]);

    render(<RenderCard data={mockAnimeWithoutSynopsis} />);

    expect(screen.getByText(/No description available/i)).toBeInTheDocument();
  });

  it('calls dispatch(toggleItem) when checkbox is clicked', () => {
    useSelectorMock.mockReturnValue([]);

    render(<RenderCard />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith(toggleItem(MOCK_ANIME_DETAILS));
  });

  it('updates checkbox state when item is selected', () => {
    useSelectorMock.mockReturnValue([{ mal_id: MOCK_ANIME_DETAILS.mal_id }]);

    render(<RenderCard />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('updates checkbox state when item is unselected', () => {
    useSelectorMock.mockReturnValue([]);

    render(<RenderCard />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('Navigates to the correct details page', async () => {
    render(<RenderCard />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/details/${MOCK_ANIME_DETAILS.mal_id}`);
  });
});
