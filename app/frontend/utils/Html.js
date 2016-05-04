import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }

  render() {
    const { assets, component, store } = this.props,
          content = component ? ReactDOM.renderToString(component) : '',
          head = Helmet.rewind(),
          getState = serialize(store.getState())

    return (
      <html lang='en-us'>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}

          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media='screen, projection'
                  rel='stylesheet' type='text/css' charSet='UTF-8' />
          )}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={ // eslint-disable-line react/no-danger
              { __html: content }
          } />
          <script charSet='UTF-8' dangerouslySetInnerHTML={ // eslint-disable-line react/no-danger
              { __html: `window.__data=${getState};` }
          } />
          {Object.keys(assets.javascript).map((script, key) =>
            <script src={assets.javascript[script]} key={key} charSet='UTF-8' />
          )}
        </body>
      </html>
    )
  }
}
