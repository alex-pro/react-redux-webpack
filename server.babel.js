var fs = require('fs'), // eslint-disable-line no-var
    babelrc = fs.readFileSync('./.babelrc'),
    config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.') // eslint-disable-line no-console
  console.error(err) // eslint-disable-line no-console
}

require('babel-register')(config)
