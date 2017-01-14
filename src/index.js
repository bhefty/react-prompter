import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'

import Routes from './routes'
let store = require('./store/configureStore').configure()

import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
