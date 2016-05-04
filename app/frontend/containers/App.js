import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import NavBar from '../components/NavBar'

import useSheet from 'react-jss'
import classNames from 'classnames'
import config from '../config/index'

import '../config/jss'
import { styles } from '../styles/app'

class App extends Component {
  displayName: 'App'

  render() {
    const { children, sheet, location } = this.props,
          { pathname } = location,
          { classes } = sheet

    return (
      <div>
        <Helmet {...config.app.head} titleTemplate={`%s | Home`} />
        <NavBar classes={classes} classNames={classNames} pathname={pathname} />
        <main className={classes.main}>
          {children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  sheet: React.PropTypes.shape({
    classes: React.PropTypes.object.isRequired
  }).isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired
  }).isRequired
}

export default connect(null)(useSheet(App, styles))
