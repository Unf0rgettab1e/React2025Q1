import { Component } from 'react';
import AnimeSearch from './pages/AnimeSearch/AnimeSearch';

export default class App extends Component {
  render() {
    return (
      <div className="w-screen min-h-screen">
        <AnimeSearch />
      </div>
    );
  }
}
