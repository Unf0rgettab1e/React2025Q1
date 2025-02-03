import { Component } from 'react';
import { TAnime } from '../../api/types';
import AnimeList from '../../components/AnimeList/AnimeList';
import SearchForm from '../../components/SearchForm/SearchForm';
import searchAnime from '../../api/requests/searchAnime';
import Loader from '../../components/ui/Loader/Loader';
import { ErrorButton } from '../../components/ui/Button/ErrorButton/ErrorButton';

export default class AnimeSearch extends Component {
  state: { searchResults: TAnime[]; isLoading: boolean } = { searchResults: [], isLoading: false };

  handleSearch = async (query: string) => {
    this.setState({ isLoading: true });
    const { data } = await searchAnime(query);
    this.setState({ searchResults: data || [], isLoading: false });
  };

  render() {
    return (
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 mx-auto p-8">
        <div className="flex-1">
          <SearchForm onSearch={this.handleSearch} />
        </div>

        <div className="flex flex-col items-center h-full">
          {this.state.isLoading ? <Loader /> : <AnimeList animeData={this.state.searchResults} />}
          <ErrorButton />
        </div>
      </div>
    );
  }
}
