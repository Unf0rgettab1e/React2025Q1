import { FC } from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  testId?: string;
  children: React.ReactNode | string;
}

const Button: FC<ButtonProps> = ({ type, className, onClick, testId, children }) => {
  return (
    <button type={type || 'button'} className={`btn ${className || ''}`} onClick={onClick} data-testid={testId}>
      {children}
    </button>
  );
};

export default Button;
