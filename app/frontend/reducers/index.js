import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { users } from './users'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

const rootReducer = combineReducers({
  reduxAsyncConnect,
  routing,
  users
})

export default rootReducer
