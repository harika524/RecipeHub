// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This correctly imports your App.js
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);