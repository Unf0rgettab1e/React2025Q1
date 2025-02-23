import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import Main from '~/pages/Main/Main';

vi.mock(import('react-router'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    Outlet: vi.fn(() => <div data-testid="outlet" />),
  };
});

vi.mock('~/components/AnimeList/AnimeList', () => ({
  default: vi.fn(() => <div data-testid="anime-list" />),
}));

vi.mock('~/components/Errors/ErrorBoundary/ErrorButton/ErrorButton', () => ({
  default: vi.fn(() => <div data-testid="error-button" />),
}));

describe('Main Component', () => {
  it('renders AnimeList, Outlet, and ErrorButton', () => {
    render(<Main />);

    expect(screen.getByTestId('anime-list')).toBeInTheDocument();

    expect(screen.getByTestId('outlet')).toBeInTheDocument();

    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    render(<Main />);

    const container = screen.getByTestId('main-container');
    expect(container).toHaveClass('flex-1 flex flex-col items-center h-full');

    const innerContainer = screen.getByTestId('inner-container');
    expect(innerContainer).toHaveClass('flex justify-center w-full p-4 gap-x-4 md:gap-x-8');
  });

  it('renders nested routes via Outlet', () => {
    vi.mocked(Outlet).mockImplementation(() => <div data-testid="nested-route" />);

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="details/:id" element={<div data-testid="nested-route" />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('nested-route')).toBeInTheDocument();
  });
});
