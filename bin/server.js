#!/usr/bin/env node
require('../server.babel')
var path = require('path'),
    rootDir = path.resolve(__dirname, '..'),
    server = path.resolve(rootDir, './app/frontend/server.js'),
    webpackIsomorphicTools = path.resolve(rootDir, './app/frontend/webpack/webpack-isomorphic-tools'),
    WebpackIsomorphicTools = require('webpack-isomorphic-tools')

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development'

if (__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return
  }
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require(webpackIsomorphicTools)).
  development(__DEVELOPMENT__).
  server(rootDir, function() {
    require(server)
  })
