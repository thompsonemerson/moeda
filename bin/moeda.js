const got = require('got')
const ora = require('ora')
const money = require('money')
const chalk = require('chalk')
const currencies = require('../lib/currencies.json')
const API = 'https://api.ratesapi.io/api/latest'

const moeda = async (command) => {
  const amount = command['amount']
  const from = command['from'].toUpperCase()
  const to = command['to'].filter((item) => item !== from).map((item) => item.toUpperCase())

  const loading = ora({
    text: 'Converting currency...',
    color: 'green',
    spinner: {
      interval: 200,
      frames: to
    }
  })

  console.log()
  loading.start()

  require('dns').resolve('www.emersonthompson.com.br', async (err) => {
    if (err) {
      loading.fail(chalk.red('Internal server error...\n'))
      process.exit(1)
    } else {
      const { body } = await got(API + `?base=${from}&symbols=${to.toString()}`, { json: true })

      money.base = body.base
      money.rates = body.rates

      Object.entries(body.rates).map(([currency]) => {
        const value = money.convert(amount, { from, to: currency }).toFixed(2)

        loading.succeed(`${chalk.green(value)} ${chalk.gray(`(${currency})`)} ${chalk.italic(currencies[currency])}`)
      })

      console.log(chalk.gray(`\nCurrency base: ${amount} ${from}`))

      return
    }
  })
}

module.exports = moeda
