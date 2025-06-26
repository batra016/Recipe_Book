import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Recipe_Book">
      <App />
    </BrowserRouter>
  </StrictMode>
);
