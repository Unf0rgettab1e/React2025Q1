import { Component, ReactNode } from 'react';
import Button from '../../ui/Button/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('ErrorBoundary caught error:', error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen text-center">
          <h1 className="text-2xl font-bold text-red-500">Oops! Something went wrong 😢</h1>
          <p className="text-gray-600">Write to tech support when possible....</p>
          <Button className="btn-primary" onClick={() => this.setState({ hasError: false })}>
            Back to search
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
