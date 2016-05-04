import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import config from './config/index'
import favicon from 'serve-favicon'
import compression from 'compression'
import path from 'path'
import configureStore from './store/configure_store'
import ApiClient from './utils/ApiClient'
import Html from './utils/Html'
import PrettyError from 'pretty-error'
import http from 'http'

import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'
import getRoutes from './routes/index'

const internalServerError = 500,
      success = 200,
      notFound = 404,

      targetUrl = `http://${config.apiHost}:${config.apiPort}`,
      pretty = new PrettyError(),
      app = new Express(),
      server = new http.Server(app)

app.use(compression())
app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')))
app.use(Express.static(path.join(__dirname, '..', '..', 'public')))

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // clear require() cache if in development mode
    // (makes asset hot reloading work)
    webpackIsomorphicTools.refresh()
  }
  const client = new ApiClient(req),
        history = createHistory(req.originalUrl),
        store = configureStore(history, client)

  function hydrateOnClient() {
    res.send(
      `<!doctype html>\n ${ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>)}`
    )
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient()
    return
  }

  match({ history, routes: getRoutes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error)) // eslint-disable-line no-console
      res.status(internalServerError)
      hydrateOnClient()
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { client } }).then(() => {
        const component = (
          <Provider store={store} key='provider'>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )

        res.status(success)

        global.navigator = { userAgent: req.headers['user-agent'] }

        res.send(`<!doctype html>\n
          ${ReactDOM.renderToString(
            <Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>
          )}
        `)
      })
    } else {
      res.status(notFound).send('Not found')
    }
  })
})

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err) // eslint-disable-line no-console
    }
    console.info( // eslint-disable-line no-console
      '----\n==> ✅  %s is running, talking to API server on %s.',
      config.app.head.title,
      config.apiPort
    )
    console.info( // eslint-disable-line no-console
      '==> 💻  Open http://%s:%s in a browser to view the app.',
      config.host,
      config.port
    )
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified') // eslint-disable-line no-console
}
