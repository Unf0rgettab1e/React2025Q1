import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../ui/Button/Button';
import Icon from '../ui/Icon';
import { useSearchQuery } from './useSearchQuery';

interface SearchFormProps {
  styles?: string;
}

export default function SearchForm({ styles }: SearchFormProps) {
  const { query, setQuery, saveQuery } = useSearchQuery();
  const navigate = useNavigate();

  const navigateByQuery = () => {
    navigate(query ? `?query=${query}` : '/');
  };

  useEffect(() => {
    navigateByQuery();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveQuery(query);
    navigateByQuery();
  };

  return (
    <form className={`w-full mx-auto ${styles || ''}`} onSubmit={handleSubmit}>
      <label htmlFor="search-input" className="\ text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <Icon id="search-icon" className="w-6 h-6 text-zinc-500" />
        </div>
        <input
          type="search"
          id="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full ps-10 lg:text-lg flex h-14 items-center justify-start rounded-full border bg-transparent pr-9 outline-none"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 end-22 flex items-center ps-3 cursor-pointer" onClick={() => setQuery('')}>
          <Icon id="cross" className="w-6 h-6 text-zinc-500 hover:text-zinc-400" />
        </div>
        <Button type="submit" className="absolute end-2.5 bottom-2.5 btn-primary">
          Search
        </Button>
      </div>
    </form>
  );
}
