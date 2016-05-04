var Express = require('express'), // eslint-disable-line no-var
    webpack = require('webpack'),
    config = require('../config/index'),
    webpackConfig = require('./dev.config'),
    compiler = webpack(webpackConfig),
    host = config.host,
    port = config.serverListening,
    serverOptions = {
      contentBase: `http://${host}:${port}`,
      quiet: true,
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: { colors: true }
    },
    app = new Express()

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, function onAppListening(err) {
  if (err) {
    return console.error(err) // eslint-disable-line no-console
  }
  return console.info('==> 🚧  Webpack development server listening on port %s', port) // eslint-disable-line no-console
})
