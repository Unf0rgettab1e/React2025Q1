import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import ErrorBoundary from '~/components/Errors/ErrorBoundary/ErrorBoundary.tsx';
import ThemeProvider from '~/context/ThemeContext/ThemeProvider.tsx';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '~/store/store.ts';

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
