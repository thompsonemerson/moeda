const chalk = require('chalk')
const pkg = require('../package.json')
const data = require('../lib/currencies.json')

const helpers = (argv) => {
  // version
  if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
    version()
  }

  // help
  if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1 || !argv.length) {
    help()
  }

  // currencies
  if (argv.indexOf('--currencies') !== -1 || argv.indexOf('-c') !== -1 || !argv.length) {
    currencies()
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

const currencies = () => {
  console.log(chalk.gray('\n  Currencies:\n'))

  Object.entries(data).map(([symbol, name]) => {
    console.log(`  ${chalk.gray(symbol)} ${name}`)
  })

  process.exit(1)
}

module.exports = helpers
