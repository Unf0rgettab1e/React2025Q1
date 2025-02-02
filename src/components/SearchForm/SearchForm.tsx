import { Component } from 'react';
import Icon from '../ui/Icon';
import searchAnime from '../../api/requests/searchAnime';
import { TAnime } from '../../api/types';

const LC_KEY = 'animeSearchQuery';

interface SearchFormProps {
  onSearch: (result: TAnime[]) => void;
}

export default class SearchForm extends Component<SearchFormProps> {
  state: { query: string; results: TAnime[] } = {
    query: localStorage.getItem(LC_KEY) || '',
    results: [],
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = this.state;
    localStorage.setItem(LC_KEY, query);

    if (!query) return;

    const { data } = await searchAnime(query);
    this.setState({ results: data || [] });
    this.props.onSearch(data || []);
  };

  render() {
    const { query } = this.state;

    return (
      // <div>
      <form className="max-w-md mx-auto" onSubmit={this.handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <Icon id="search-icon" className="text-zinc-500 hover:text-zinc-400 stroke-2" />
          </div>
          <input
            type="search"
            id="search-input"
            value={query}
            onChange={this.handleChange}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
            placeholder="Search..."
            required
          />
          <button type="submit" className="absolute end-2.5 bottom-2.5 btn">
            Search
          </button>
        </div>
      </form>
      // </div>
    );
  }
}
