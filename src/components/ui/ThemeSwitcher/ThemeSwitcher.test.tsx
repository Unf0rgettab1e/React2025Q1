import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Icon from '~/components/ui/Icon';
import ThemeProvider from '~/context/ThemeContext/ThemeProvider';
import ThemeSwitcher from './ThemeSwitcher';

vi.mock('~/components/ui/Icon', () => ({
  default: vi.fn(({ id, className }) => <div data-testid={`icon-${id}`} className={className} />),
}));

const RenderSwitcher = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};
describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.mocked(Icon).mockClear();
  });

  it('renders the theme switcher button', () => {
    render(<RenderSwitcher />);

    const button = screen.getByRole('button', { name: /theme/i });
    expect(button).toBeInTheDocument();
  });

  it('calls toggleTheme when the button is clicked', () => {
    render(<RenderSwitcher />);

    const button = screen.getByRole('button', { name: /theme/i });
    fireEvent.click(button);

    const sunIcon = screen.getByTestId('icon-sun');
    expect(sunIcon).toHaveClass('h-6 w-6');
  });

  it('shows the moon icon when the theme is light', () => {
    localStorage.setItem('theme', 'light');
    render(<RenderSwitcher />);

    const moonIcon = screen.getByTestId('icon-moon');
    expect(moonIcon).toHaveClass('h-6 w-6');

    const sunIcon = screen.getByTestId('icon-sun');
    expect(sunIcon).toHaveClass('h-0 w-0 opacity-0');
  });

  it('shows the sun icon when the theme is dark', () => {
    localStorage.setItem('theme', 'dark');
    render(<RenderSwitcher />);

    const sunIcon = screen.getByTestId('icon-sun');
    expect(sunIcon).toHaveClass('h-6 w-6');

    const moonIcon = screen.getByTestId('icon-moon');
    expect(moonIcon).toHaveClass('h-0 w-0 opacity-0');
  });
});
