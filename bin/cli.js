#! /usr/bin/env node
'use strict'

const pkg = require('../package.json')
const got = require('got')
const money = require('money')
const colors = require('colors')
const API = 'https://api.fixer.io/latest'
const currencies = require('../currencies.json')


// arguments
let argv = process.argv.slice(2)
let amount = argv[0]
let from = argv[1]


// version
if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pkg.version)
  process.exit(1)
}


// help
if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1 || !argv.length) {
  console.log(`
    Usage
      $ moeda <amount> <currency> [<...currencies>]

    Some currency
      [ usd, eur, gbp, brl... ]

    Examples
      $ moeda 1 usd

    Result
                 Euro: 0.92
      Libra Esterlina: 0.82
       Real Brazilian: 3.15

      Conversion of USD 1

    Your own currencies to convert

    $ moeda 1 usd eur rub aud

    Result

                 Euro: 0.91
       Russian Rouble: 62.92
    Australian Dollar: 1.30

      Conversion of USD 1
  `)
  process.exit(1)
}


// default
console.log()
got(API, { json: true }).then((response) => {
  money.base  = response.body.base
  money.rates = response.body.rates

  let rates = ['USD', 'EUR', 'GBP', 'BRL'],
      names = [
        '      Dollar EUA:',
        '            Euro:',
        ' Libra Esterlina:',
        '  Real Brazilian:'
      ]

  if (argv.length > 2) {
    let to = process.argv.slice(4)

    rates = []
    names = []

    to.map((code) => {
      code = code.toUpperCase()
      rates.push(code)
      names.push(currencies[code])
    })
  }

  rates.map((item, index) => {
    if (item !== from.toUpperCase()) {
      console.log(` ${names[index].gray.italic} ${money.convert(amount, {
        from: from.toUpperCase(),
        to  : item
      }).toFixed(2).green.bold} `)
    }
  })

  console.log(`
    Conversion of ${from.toUpperCase()} ${amount}
    `.italic.gray)
  process.exit(1)

}).catch((error) => {
  if(error.code === 'ENOTFOUND') {
    console.log('   Please check your internet connection.\n'.red)
  } else {
    console.log('   Internal server error... \n'.red)
  }
  process.exit(1)
})
