const got = require('got')
const money = require('money')
const colors = require('colors')
const ora = require('ora')
const currencies = require('../lib/currencies.json')
const Api = (accessKey) => (`http://data.fixer.io/api/latest?access_key=${accessKey}`)

const moeda = (command) => {
  let amount = command['amount']
  let from = command['from'].toUpperCase()
  let to = command['to'].filter((item) => item !== from).map((item) => item.toUpperCase())
  const accessKey = command.accessKey

  console.log()
  const loading = ora({
    text: 'Converting currency...',
    color: 'green',
    spinner: {
      interval: 200,
      frames: to
    }
  })
  loading.start()

  got(Api(accessKey), { json: true }).then((response) => {
    money.base = response.body.base
    money.rates = response.body.rates

    to.map((item) => {
      if (currencies[item]) {
        loading.succeed(`${colors.green(money.convert(amount, { from: from, to: item }).toFixed(2))} ${`(${item})`.gray} ${currencies[item].italic}`)
      } else {
        loading.warn(`${colors.yellow(` The ${item} currency not found`)}`)
      }
    })

    console.log()
    console.log(colors.italic.gray(` Conversion of ${from.bold} ${amount.bold}`))
    process.exit(1)
  }).catch((error) => {
    if (error.code === 'ENOTFOUND') {
      loading.fail(colors.red('   Please check your internet connection.\n'))
    } else {
      loading.fail(colors.red('   Internal server error... \n'))
    }

    process.exit(1)
  })
}

module.exports = moeda
