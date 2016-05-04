import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

export default class NavBar extends Component {
  displayName: 'NavBar'

  render() {
    const { classes, classNames, pathname } = this.props

    return (
      <nav className={classNames({
        [classes.clearFix]: true,
        [classes.navBar]: true
      })}>
        <ul>
          <li className={classNames({
            [classes.active]: pathname === '/'
          })}>
            <IndexLink to='/'>Home</IndexLink>
          </li>
          <li className={classNames({
            [classes.active]: pathname === '/about'
          })}>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

NavBar.propTypes = {
  classes: React.PropTypes.object.isRequired,
  classNames: React.PropTypes.func.isRequired,
  pathname: React.PropTypes.string.isRequired
}
