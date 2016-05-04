import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configure_store'
import ApiClient from './utils/ApiClient'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { ReduxAsyncConnect } from 'redux-async-connect'
import useScroll from 'scroll-behavior/lib/useStandardScroll'

import routes from './routes/index'

const client = new ApiClient(),
      history = useScroll(() => browserHistory)(),
      dest = document.getElementById('root'),
      store = configureStore(history, client, window.__data),
      component = (
        <Router render={ (props) => // eslint-disable-line react/display-name
          <ReduxAsyncConnect { ...props } helpers={{ client }} filter={ (item) => !item.deferred } />
        } history={history}>
          {routes}
        </Router>
      )

ReactDOM.render(
  <Provider store={store} key='provider'>
    {component}
  </Provider>,
  dest
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
  const checksum = document.getElementsByTagName('html')[0]

  if (!checksum || !checksum.attributes || !checksum.attributes['data-react-checksum']) {
    console.error( // eslint-disable-line no-console
      'Server-side React render was discarded. ' +
      'Make sure that your initial render does not contain any client-side code.'
    )
  }
}
