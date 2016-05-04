require('babel-polyfill')

var fs = require('fs'), // eslint-disable-line no-var
    path = require('path'),
    webpack = require('webpack'),
    projectRootPath = path.resolve(__dirname, '../../../'),
    assetsPath = path.resolve(projectRootPath, './public/dist'),
    babelrc = path.resolve(projectRootPath, './.babelrc'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    config = require('../config/index'),

    host = config.host,
    port = config.serverListening,
    WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin'),
    webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')),

    babelrc = fs.readFileSync(babelrc),
    babelrcObject = {},
    babelrcObjectDevelopment,
    combinedPlugins,
    babelLoaderQuery,
    reactTransform = null,
    i = 0,
    plugin

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.') // eslint-disable-line no-console
  console.error(err) // eslint-disable-line no-console
}

babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}
combinedPlugins = babelrcObject.plugins || [] // merge global and dev-only plugins
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)
babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins })

delete babelLoaderQuery.env

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || []

for (i; i < babelLoaderQuery.plugins.length; i += 1) {
  plugin = babelLoaderQuery.plugins[i]

  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', { transforms: [] }]
  babelLoaderQuery.plugins.push(reactTransform)
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] })
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
})

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      './client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/public/dist/`
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/,
        loaders: [`babel-loader?${JSON.stringify(babelLoaderQuery)}`, 'eslint-loader']
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=' +
        '[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'
      },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=' +
        '[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
      { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  progress: true,
  node: {
    fs: "empty"
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    new ExtractTextPlugin('[name].css'),
    webpackIsomorphicToolsPlugin.development()
  ]
}
