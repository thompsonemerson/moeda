#! /usr/bin/env node
'use strict'

const pkg     = require('../package.json'),
      got     = require('got'),
      money   = require('money'),
      colors  = require('colors'),
      API     = 'https://api.fixer.io/latest'


// arguments
let argv   = process.argv.slice(2),
    amount = argv[0],
    from   = argv[1]


// version
if(argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pkg.version)
  return
}


// help
if(argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1 || argv.length == 0) {
  console.log(`
    Usage
      $ moeda <amount> <currency>

    Some currency
      [ usd, eur, gbp, brl... ]

    Examples
      $ moeda 1 usd

    Result
                 Euro: 0.92
      Libra Esterlina: 0.82
       Real Brazilian: 3.15

      Conversion of USD 1
`)
  return
}


// default
console.log()
got(API, { json: true }).then(response => {
  money.base = response.body.base
  money.rates = response.body.rates

  let rates = ['USD', 'EUR', 'GBP', 'BRL'],
      names = [
        '      Dollar EUA:',
        '            Euro:',
        ' Libra Esterlina:',
        '  Real Brazilian:'
      ]

  rates.map((item, index) => {
    if(item != from.toUpperCase()) {

      console.log(` ${names[index].gray.italic} ${money.convert(amount, {
        from: from.toUpperCase(),
        to: item
      }).toFixed(2).green.bold} `)

    }
  })

  console.log(`
    Conversion of ${from.toUpperCase()} ${amount}
    `.italic.gray)
})
