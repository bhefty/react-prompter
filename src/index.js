import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

// import App from './components/App';
import Routes from './routes'

import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
