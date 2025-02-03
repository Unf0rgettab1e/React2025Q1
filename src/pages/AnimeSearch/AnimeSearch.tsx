import { Component } from 'react';
import { TAnime } from '../../api/types';
import AnimeList from '../../components/AnimeList/AnimeList';
import SearchForm from '../../components/SearchForm/SearchForm';
import searchAnime from '../../api/requests/searchAnime';
import { ErrorButton } from '../../components/ui/Button/ErrorButton/ErrorButton';
import ErrorResponse from '../../components/Errors/ErrorRsponse/ErrorRsponse';

interface State {
  searchResults?: TAnime[];
  isLoading: boolean;
  error?: string;
}

export default class AnimeSearch extends Component<unknown, State> {
  state = { searchResults: undefined, isLoading: false, error: '' };

  handleSearch = async (query: string) => {
    this.setState({ isLoading: true });
    const { data, error } = await searchAnime(query);
    this.setState({ searchResults: data, isLoading: false, error });
  };

  render() {
    return (
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 mx-auto p-8">
        <div className="flex-1">
          <SearchForm onSearch={this.handleSearch} error={this.state.error} />
        </div>

        <div className="flex flex-col items-center h-full">
          {this.state.error && <ErrorResponse errorMessage={this.state.error} />}
          {this.state.searchResults && (
            <AnimeList animeData={this.state.searchResults} loading={this.state.isLoading} />
          )}
          <ErrorButton />
        </div>
      </div>
    );
  }
}
