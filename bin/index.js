#!/usr/bin/env node

const helpers = require('./helpers.js')
const moeda = require('./moeda.js')

const argv = process.argv.slice(2)
helpers(argv)

const command = {
  amount: argv[0] || 1,
  from: argv[1] || 'USD',
  to: (argv.length > 2) ? process.argv.slice(4) : ['USD', 'EUR', 'GBP', 'BRL'],
  accessKey: process.env.FIXER_ACCESS_KEY
}
moeda(command)
