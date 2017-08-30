const pkg = require('../package.json')

const helpers = (argv) => {
  // version
  if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
    version()
  }

  // help
  if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1 || !argv.length) {
    help()
  }
}

const version = () => {
  console.log(pkg.version)
  process.exit(1)
}

const help = () => {
  console.log(`
  Usage
    $ moeda <amount> <currency> [<...currencies>]

  Some currency
    [ usd, eur, gbp, brl... ]

  Examples
    $ moeda 1 usd

    or

    $ moeda 1 usd eur rub aud
  `)
  process.exit(1)
}

module.exports = helpers
