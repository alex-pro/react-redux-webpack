import 'babel-polyfill'
import apiCall from '../utils/ApiCall'

export const
      REQUEST_USERS = 'REQUEST_USERS',
      RECEIVE_USERS = 'RECEIVE_USERS'

function requestUsers(params) {
  return {
    type: REQUEST_USERS,
    params
  }
}

function receiveUsers(json) {
  return {
    type: RECEIVE_USERS,
    users: json
  }
}

export function fetchUsers(params = {}) {
  return function(dispatch) {
    dispatch(requestUsers(params))

    return apiCall({
      method: 'GET',
      path: '/users'
    }).
    then((json) => dispatch(receiveUsers(json.data))).
    catch((err) => console.log(err)) // eslint-disable-line no-console
  }
}
