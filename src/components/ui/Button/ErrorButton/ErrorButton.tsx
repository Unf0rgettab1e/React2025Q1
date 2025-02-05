import { Component } from 'react';
import Button from '../Button';

export class ErrorButton extends Component {
  state = {
    throwError: false,
  };

  onClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Check Error Boundary');
    }

    return (
      <Button className="max-w-100 text-red-500" onClick={this.onClick}>
        Throw render error
      </Button>
    );
  }
}
