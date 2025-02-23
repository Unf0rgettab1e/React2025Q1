import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from '~/components/ui/Pagination/Pagination';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('Pagination Component', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('Component updates URL query parameter when page changes', () => {
    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ page: '1' }), setSearchParamsMock]);

    const { rerender } = render(
      <MemoryRouter>
        <Pagination lastPage={5} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('>'));
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '2' });

    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ page: '2' }), setSearchParamsMock]);
    rerender(
      <MemoryRouter>
        <Pagination lastPage={5} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('3'));
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '3' });

    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ page: '3' }), setSearchParamsMock]);
    rerender(
      <MemoryRouter>
        <Pagination lastPage={5} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('<'));
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '2' });
  });

  it('renders correctly with first and last page', () => {
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ page: '1' }), vi.fn()]);

    render(
      <MemoryRouter>
        <Pagination lastPage={5} />
      </MemoryRouter>
    );

    expect(screen.queryByText('<')).not.toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables previous button on first page and next button on last page', () => {
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ page: '1' }), vi.fn()]);

    const { rerender } = render(
      <MemoryRouter>
        <Pagination lastPage={5} />
      </MemoryRouter>
    );

    expect(screen.queryByText('<')).not.toBeInTheDocument();

    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ page: '5' }), vi.fn()]);

    rerender(
      <MemoryRouter>
        <Pagination lastPage={5} />
      </MemoryRouter>
    );

    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });
});
