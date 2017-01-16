import * as redux from 'redux'
import thunk from 'redux-thunk'
import { userReducer, authReducer } from '../reducers/reducers'
import { persistStore, autoRehydrate, storages } from 'redux-persist'

export let configure = (initialState = {}) => {
  let reducer = redux.combineReducers({
    user: userReducer,
    auth: authReducer
  })

  let store = redux.createStore(reducer, initialState, redux.compose(
    autoRehydrate(),
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  persistStore(store, { storage: storages.localStorage })

  return store
}
