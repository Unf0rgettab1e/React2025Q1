import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '~/components/ui/Pagination';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Pagination Component', () => {
  it('renders correctly with first and last page', () => {
    render(
      <BrowserRouter>
        <Pagination page={1} lastPage={5} setPage={() => {}} />
      </BrowserRouter>
    );

    expect(screen.queryByText('<')).not.toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables previous button on first page and next button on last page', () => {
    const { rerender } = render(
      <BrowserRouter>
        <Pagination page={1} lastPage={5} setPage={() => {}} />
      </BrowserRouter>
    );

    expect(screen.queryByText('<')).not.toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <Pagination page={5} lastPage={5} setPage={() => {}} />
      </BrowserRouter>
    );

    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });
});
