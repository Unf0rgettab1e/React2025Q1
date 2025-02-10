import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import ErrorBoundary from '~/components/Errors/ErrorBoundary/ErrorBoundary.tsx';
import App from './App.tsx';

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
