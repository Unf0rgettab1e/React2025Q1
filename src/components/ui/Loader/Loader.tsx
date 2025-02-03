import { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <img src="/logo.svg" alt="loader" className="w-10 h-10 animate-spin"></img>
      </div>
    );
  }
}
