import { Component } from 'react';

interface Props {
  errorMessage: string;
}

export default class ErrorResponse extends Component<Props> {
  render() {
    return (
      <div className="flex flex-col gap-4 items-center justify-center my-30 text-center">
        <h2 className="text-2xl font-bold text-orange-500">{`Error: ${this.props.errorMessage}`}</h2>
        <p className="text-gray-600">Try again another time...</p>
      </div>
    );
  }
}
