const formats = require('../constants/formats')

const fs = require('fs')

const parseToJson = data => JSON.parse(data)
const readFile = json => fs.readFileSync(json, formats.UTF8)

module.exports = { parseToJson, readFile }
