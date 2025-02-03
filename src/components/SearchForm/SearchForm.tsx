import { Component } from 'react';
import Icon from '../ui/Icon';
import { TAnime } from '../../api/types';
import Button from '../ui/Button/Button';

const LC_KEY = 'animeSearchQuery';

interface SearchFormProps {
  onSearch: (query: string) => void;
  styles?: string;
  error?: string;
}

interface SearchFormState {
  query: string;
  prevQuery: string;
  results: TAnime[];
}

export default class SearchForm extends Component<SearchFormProps, SearchFormState> {
  state = { query: '', prevQuery: '', results: [] };

  componentDidMount() {
    const query = localStorage.getItem(LC_KEY) || '';

    if (query) {
      this.props.onSearch(query);
      this.setState({ query, prevQuery: query });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = this.state;

    if ((!query.trim() || query === this.state.prevQuery) && !this.props.error) return;

    localStorage.setItem(LC_KEY, query);
    this.setState({ prevQuery: query });
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
          />
          <Button type="submit" className="absolute end-2.5 bottom-2.5 btn-primary">
            Search
          </Button>
        </div>
      </form>
    );
  }
}
