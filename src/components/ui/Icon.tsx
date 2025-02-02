import { Component } from 'react';

interface IconProps {
  id: string;
  className?: string;
}

class Icon extends Component<IconProps> {
  render() {
    const { id, className } = this.props;
    return (
      <svg className={`w-6 h-6 ${className}`}>
        <use href={`/sprite.svg#${id}`} />
      </svg>
    );
  }
}

export default Icon;
