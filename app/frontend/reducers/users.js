import { Map, List, fromJS } from 'immutable'
import { REQUEST_USERS, RECEIVE_USERS } from '../actions/users'

const initialState = Map({
  list: List(),
  isLoading: false
})

export function users(state = initialState, action) {
  const _state = fromJS(state)

  switch (action.type) {
    case REQUEST_USERS:
      return _state.set('isLoading', true)
    case RECEIVE_USERS:
      return _state.set('list', action.users).set('isLoading', false)
    default:
      return _state
  }
}
