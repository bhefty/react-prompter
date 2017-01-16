import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'

import Routes from './routes'

import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.css'
// console.log('before store')
let store = require('./store/configureStore').configure()

// const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
// const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
// export const auth = new Auth0Service(AUTH0_CLIENT_ID, AUTH0_DOMAIN)

// console.log('store', )

// let isAuthenticated = store.getState().auth.isAuthenticated

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory}/>
  </Provider>,
  document.getElementById('root')
);
