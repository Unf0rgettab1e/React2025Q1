import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, Mock, vi } from 'vitest';
import { useTheme } from '~/context/ThemeContext/useTheme';
import Layout from './Layout';

vi.mock('~/context/ThemeContext/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Layout Component', () => {
  it('renders with children', () => {
    (useTheme as Mock).mockReturnValue({ theme: 'light' });

    render(
      <MemoryRouter>
        <Layout>
          <div data-testid="child">Child Component</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByTestId('layout')).toHaveClass('light');
  });

  it('renders Outlet when children are not provided', () => {
    (useTheme as Mock).mockReturnValue({ theme: 'dark' });

    vi.mock('react-router', async () => {
      const actual = await vi.importActual('react-router');
      return {
        ...actual,
        Outlet: () => <div data-testid="outlet">Outlet</div>,
      };
    });

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('outlet')).toBeInTheDocument();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByTestId('layout')).toHaveClass('dark');
  });
});
