import { useNavigate } from 'react-router';
import SearchForm from '~/components/SearchForm/SearchForm';
import ThemeSwitcher from '~/components/ThemeSwitcher';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-100 bg-slate-800/90 shadow-lg">
      <div className="flex items-center justify-between gap-x-4 px-2 py-3 sm:px-10 sm:py-0">
        <div>
          <img src="/logo.svg" alt="logo" className="max-h-20 cursor-pointer" onClick={() => navigate('/')} />
        </div>
        <SearchForm styles="max-w-md" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
