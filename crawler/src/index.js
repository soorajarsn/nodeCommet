import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './reset.scss';
import './theme.scss';
import './styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);