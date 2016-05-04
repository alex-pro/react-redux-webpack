require('babel-polyfill')

var path = require('path'), // eslint-disable-line no-var
    webpack = require('webpack'),
    CleanPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    strip = require('strip-loader'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    projectRootPath = path.resolve(__dirname, '../../../'),
    assetsPath = path.resolve(projectRootPath, './public/dist'),
    WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin'),
    webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': ['./client.js']
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loaders: [strip.loader('debug'), 'babel'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.useable\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'useable!css') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=2&sourceMap' +
        '!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=2&sourceMap' +
        '!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' }
    ]
  },
  postcss() {
    return [autoprefixer, precss]
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
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    webpackIsomorphicToolsPlugin
  ]
}
