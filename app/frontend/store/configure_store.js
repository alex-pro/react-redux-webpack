import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createMiddleware from './middleware/clientMiddleware'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/index'

export default function configureStore(history, client, data) {
  const middlewares = [createMiddleware(client), routerMiddleware(history)]

  let finalCreateStore

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { Iterable } = require('immutable'),
          createLogger = require('redux-logger'),
          promise = require('redux-promise'),
          immutableStateInvariant = require('redux-immutable-state-invariant'),
          stateTransformer = (state) => {
            if (Iterable.isIterable(state)) {
              return state.toJS()
            }
            return state
          },
          logger = createLogger({ stateTransformer })

    middlewares.push(promise, logger, immutableStateInvariant())

    finalCreateStore = compose(applyMiddleware(...middlewares))(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(_createStore)
  }

  const store = finalCreateStore(rootReducer, data) // eslint-disable-line one-var

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(require('../reducers/index'))
    })
  }

  return store
}
