import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import App from './containers/App';
import './assets/sanitize.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-core/register';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';

const GlobalStyle = createGlobalStyle`
  body, html {
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: transparent;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    height: 100%;
  }
`;

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <ErrorBoundary>
        <GlobalStyle />
        <App />
      </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('app'),
  );
};

renderApp();

// install service worker in production
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('offline-plugin/runtime').install();
}
