import Icon from '~/components/ui/Icon';
import { useTheme } from '~/context/ThemeContext/useTheme';

const ThemeSwitcher = function () {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme} className="h-10 w-10 rounded-full bg-slate-700 p-2 cursor-pointer">
      <Icon
        id="sun"
        className={`text-yellow-600 transition-all duration-500 ${theme === 'light' ? 'h-0 w-0 opacity-0' : 'h-6 w-6'}`}
      />
      <Icon
        id="moon"
        className={`text-clue-600 transition-all duration-500 ${theme === 'dark' ? 'h-0 w-0 opacity-0' : 'h-6 w-6'}`}
      />
      <span className="sr-only">Theme</span>
    </button>
  );
};

export default ThemeSwitcher;
