import { Component } from 'react';

interface IconProps {
  id: string;
  className?: string;
}

class Icon extends Component<IconProps> {
  render() {
    const { id, className } = this.props;
    return (
      <svg className={`${className}`}>
        <use href={`/sprite.svg#${id}`} />
      </svg>
    );
  }
}

export default Icon;
