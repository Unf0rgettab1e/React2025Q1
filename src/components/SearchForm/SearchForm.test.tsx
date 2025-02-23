import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { MemoryRouter } from 'react-router';
import SearchForm from '~/components/SearchForm/SearchForm';
import { LS_KEY } from '~/components/SearchForm/useSearchQuery';

const RenderSearchForm = () => (
  <MemoryRouter>
    <SearchForm />
  </MemoryRouter>
);

describe('SearchForm Component', () => {
  test('Search button saves the entered value to the local storage', async () => {
    render(<RenderSearchForm />);

    const input = screen.getByRole('searchbox');
    await userEvent.type(input, 'Naruto');

    const button = screen.getByTestId('search-button');
    await userEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('Naruto');
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem(LS_KEY, 'Your name');

    render(<RenderSearchForm />);

    expect(screen.getByRole('searchbox')).toHaveValue('Your name');
  });
});
