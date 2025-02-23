import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// vi.mock('~/components/ui/Button/Button', () => ({
//   default: vi.fn(({ children, onClick }) => <button onClick={onClick}>{children}</button>),
// }));

describe('ErrorBoundary', () => {
  const ErrorComponent = () => {
    throw new Error('Test error');
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders fallback UI when there is an error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong 😢')).toBeInTheDocument();
    expect(screen.getByText('Write to tech support when possible....')).toBeInTheDocument();
    expect(screen.getByText('Back to search')).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('resets error state when "Back to search" button is clicked', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Back to search'));

    await waitFor(() => {
      expect(screen.queryByText('Ops! Something went wrong')).not.toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });
});
