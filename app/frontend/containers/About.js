import React, { Component } from 'react'

import { browserHistory } from 'react-router'

import { DefaultH1 } from 'pui-react-typography'
import { DefaultButton } from 'pui-react-buttons'

class About extends Component {
  displayName: 'About'

  render() {
    return (
      <div>
        <DefaultH1>Elemental heading</DefaultH1>
        <DefaultButton onClick={() =>
          browserHistory.push('/')
        }>
          Go to Home
        </DefaultButton>
      </div>
    )
  }
}

export default About
