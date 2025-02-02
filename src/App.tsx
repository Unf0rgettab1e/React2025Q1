import { Component } from 'react';
import { TAnime } from './api/types';
import SearchForm from './components/SearchForm/SearchForm';

export default class App extends Component {
  state: { searchResults: TAnime[] } = { searchResults: [] };

  onSearch = (results: TAnime[]) => {
    this.setState({ searchResults: results });
  };

  render() {
    return (
      <>
        <SearchForm onSearch={this.onSearch} />
      </>
    );
  }
}
