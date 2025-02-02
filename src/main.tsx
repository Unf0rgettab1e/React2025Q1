import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
