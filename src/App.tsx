import { Component } from 'react';
import AnimeSearch from './pages/AnimeSearch/AnimeSearch';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <div className="w-screen min-h-screen">
        <ErrorBoundary>
          <AnimeSearch />
        </ErrorBoundary>
      </div>
    );
  }
}
