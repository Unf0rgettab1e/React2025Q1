import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import Flyout from './Flyout';
import useCsvDownloadUrl from './useCsvDownloadUrl';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('./useCsvDownloadUrl', () => ({
  default: vi.fn(),
}));

describe('Flyout', () => {
  const dispatchMock = vi.fn();
  const useSelectorMock = useSelector as MockedFunction<typeof useSelector>;
  const useCsvDownloadUrlMock = useCsvDownloadUrl as MockedFunction<typeof useCsvDownloadUrl>;

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(dispatchMock);
  });

  it('renders nothing when no items are selected', () => {
    useSelectorMock.mockReturnValue([]);

    const { container } = render(<Flyout />);

    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when items are selected', () => {
    useSelectorMock.mockReturnValue([1, 2, 3]);
    useCsvDownloadUrlMock.mockReturnValue('http://example.com/download.csv');

    render(<Flyout />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('calls dispatch(clearSelections) when "Unselect all" button is clicked', () => {
    useSelectorMock.mockReturnValue([1, 2, 3]);
    useCsvDownloadUrlMock.mockReturnValue('http://example.com/download.csv');

    render(<Flyout />);

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'animeDownload/clearSelections' });
  });

  it('allows download when download URL is available', () => {
    useSelectorMock.mockReturnValue([1, 2, 3]);
    useCsvDownloadUrlMock.mockReturnValue('http://example.com/download.csv');

    render(<Flyout />);

    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toHaveAttribute('href', 'http://example.com/download.csv');
    expect(downloadLink).toHaveAttribute('download', '3_anime.csv');
  });
});
