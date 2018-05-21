const CLA = require('command-line-args')
const CLAOptions = require('./../config/CLA').claOptions
const args = CLA(CLAOptions)

if (!args.duration)
   throw "Specify duration"

if (!args['phrase-count'])
   throw "Specify phrase-count"

module.exports = args