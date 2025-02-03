import { Component } from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode | string;
}

export default class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        type={this.props.type || 'button'}
        className={`btn ${this.props.className || ''}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
