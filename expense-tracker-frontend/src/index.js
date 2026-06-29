// =====================================================
// INDEX.JS — React Entry Point
//
// This is the very first JavaScript file that runs.
// Its only job: mount the React <App /> component
// into the <div id="root"> in index.html
// =====================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// Find the <div id="root"> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render our App component inside that div
// React.StrictMode helps catch bugs during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
