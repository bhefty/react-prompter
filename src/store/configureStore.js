import * as redux from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from '../reducers/reducers'

export let configure = (initialState = {}) => {
  let reducer = redux.combineReducers({
    user: userReducer
  })

  let store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
