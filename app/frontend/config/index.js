require('babel-polyfill')

const increaseServerListeningOnPort = 1,
      defaultServerListeningOnPort = 8081,
      defaultHost = 'lvh.me',
      defaultEnv = 'development',

      siteName = 'GitTorrent',
      description = "It's app that users can download free films, musics, books, programs...",

      environment = {
        development: {
          isProduction: false
        },
        production: {
          isProduction: true
        }
      }[process.env.NODE_ENV || defaultEnv]

module.exports = Object.assign({
  host: process.env.HOST || defaultHost,
  port: process.env.PORT,
  apiHost: process.env.APIHOST || defaultHost,
  apiPort: process.env.APIPORT,
  apiName: 'git-torrent',
  apiPath: '/api',
  apiVersion: 'v1',
  serverListening: (Number(process.env.PORT) + increaseServerListeningOnPort) || defaultServerListeningOnPort,

  app: {
    head: {
      title: `${siteName}`,
      meta: [
        { name: 'description', content: `${description}` },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: `${siteName}` },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: `${siteName}` },
        { property: 'og:description', content: `${description}` },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@volodimir' },
        { property: 'og:creator', content: '@volodimir' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment)
