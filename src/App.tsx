import { Component } from 'react';
import ErrorBoundary from './components/Errors/ErrorBoundary/ErrorBoundary';
import AnimeSearch from './pages/Main/Main';

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
