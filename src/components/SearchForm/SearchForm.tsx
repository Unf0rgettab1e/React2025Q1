import { Component } from 'react';
import Icon from '../ui/Icon';
import { TAnime } from '../../api/types';

const LC_KEY = 'animeSearchQuery';

interface SearchFormProps {
  onSearch: (query: string) => void;
  styles?: string;
}

export default class SearchForm extends Component<SearchFormProps> {
  state: { query: string; results: TAnime[] } = { query: '', results: [] };

  componentDidMount() {
    const query = localStorage.getItem(LC_KEY);
    this.setState({ query: query || '' });

    if (query) {
      this.props.onSearch(query);
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = this.state;
    localStorage.setItem(LC_KEY, query);

    if (!query) return;

    this.props.onSearch(query);
  };

  render() {
    const { query } = this.state;

    return (
      <form className={`max-w-md mx-auto ${this.props.styles || ''}`} onSubmit={this.handleSubmit}>
        <label htmlFor="search-input" className="\ text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <Icon id="search-icon" className="w-6 h-6 text-zinc-500 hover:text-zinc-400 stroke-2" />
          </div>
          <input
            type="search"
            id="search-input"
            value={query}
            onChange={this.handleChange}
            className="w-full ps-10 lg:text-lg flex h-14 items-center justify-start rounded-full border bg-transparent pr-9 outline-none"
            placeholder="Search..."
            required
          />
          <button type="submit" className="absolute end-2.5 bottom-2.5 btn btn-primary">
            Search
          </button>
        </div>
      </form>
    );
  }
}
