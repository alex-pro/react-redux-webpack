import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configure_store'
import routes from './routes/index'

const store = configureStore(browserHistory),
      history = syncHistoryWithStore(browserHistory, store),
      rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  rootElement
)
