import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { Map } from 'immutable'
import { fetchUsers } from '../actions/users'

class Home extends Component {
  displayName: 'Home'

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(fetchUsers())
  }

  render() {
    const { users } = this.props

    return (
      <div>
        {users.get('list').map((user, index) =>
          <div key={index}>{user.email}</div>
        )}
      </div>
    )
  }
}

Home.propTypes = {
  users: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { users } = state

  return {
    users
  }
}

export default connect(mapStateToProps)(Home)
