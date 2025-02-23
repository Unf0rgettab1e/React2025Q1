import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { NotFound } from '~/pages';

describe('Routing Tests', () => {
  it('should renders NotFound for invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(await screen.findByText(/404/i)).toBeInTheDocument();
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
    expect(await screen.findByText(/go back/i)).toBeInTheDocument();
  });
});
