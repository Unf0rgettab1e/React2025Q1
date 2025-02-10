import { useNavigate } from 'react-router';
import SearchForm from '~/components/SearchForm/SearchForm';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-slate-800/90 shadow-lg">
      <div className="flex items-center justify-between px-10">
        <div>
          <img src="/logo.svg" alt="logo" className="max-h-20 cursor-pointer" onClick={() => navigate('/')} />
        </div>

        <SearchForm styles="max-w-md" />
      </div>
    </nav>
  );
};

export default Header;
